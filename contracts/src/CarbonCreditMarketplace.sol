// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IERC1155} from "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import {IERC1155Receiver} from "@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol";
import {Address} from "@openzeppelin/contracts/utils/Address.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CarbonCreditMarketplace
 * @notice Fixed-price, non-custodial marketplace for the CarbonCreditToken (ERC-1155).
 *         - Listings are priced in native CELO (wei).
 *         - Sellers must call setApprovalForAll(marketplace, true) on the OCC token.
 *         - Supports partial fills, cancel, update price/amount.
 */
contract CarbonCreditMarketplace is ReentrancyGuard, Ownable {
    using Address for address payable;

    IERC1155 public immutable occ; // Orbyte Carbon Credit (ERC-1155)

    uint96 public feeBps; // protocol fee in basis points (e.g. 250 = 2.5%)
    address public feeRecipient; // where protocol fees are sent

    struct Listing {
        uint256 id;
        address seller;
        uint256 tokenId;
        uint256 remaining; // units (tons) left for sale
        uint256 pricePerUnit; // in wei per unit (1 unit == 1 "amount" in ERC-1155)
        uint64 startTime; // optional: 0 to start immediately
        uint64 endTime; // optional: 0 for no expiry
        bool active;
    }

    uint256 public nextListingId;
    mapping(uint256 => Listing) public listings;

    event Listed(
        uint256 indexed id,
        address indexed seller,
        uint256 indexed tokenId,
        uint256 amount,
        uint256 pricePerUnit,
        uint64 startTime,
        uint64 endTime
    );
    event ListingUpdated(
        uint256 indexed id,
        uint256 pricePerUnit,
        uint256 newRemaining
    );
    event ListingCancelled(uint256 indexed id);
    event Purchased(
        uint256 indexed id,
        address indexed buyer,
        uint256 quantity,
        uint256 totalPaid,
        uint256 feePaid
    );

    error NotSeller();
    error NotActive();
    error WrongValue();
    error InvalidQuantity();
    error TimeWindow();
    error ZeroAddr();
    error NotApproved();

    constructor(
        address occToken,
        address feeRecipient_,
        uint96 feeBps_
    ) Ownable(msg.sender) {
        if (occToken == address(0) || feeRecipient_ == address(0))
            revert ZeroAddr();
        require(feeBps_ <= 10_000, "fee too high");
        occ = IERC1155(occToken);
        feeRecipient = feeRecipient_;
        feeBps = feeBps_;
    }

    // --- Admin (protocol fee) ---
    function setFee(address recipient, uint96 bps) external onlyOwner {
        if (recipient == address(0)) revert ZeroAddr();
        require(bps <= 10_000, "fee too high");
        feeRecipient = recipient;
        feeBps = bps;
    }

    // --- Create a listing ---
    function list(
        uint256 tokenId,
        uint256 amount,
        uint256 pricePerUnitWei,
        uint64 startTime,
        uint64 endTime
    ) external returns (uint256 id) {
        require(amount > 0 && pricePerUnitWei > 0, "bad params");
        // Non-custodial: ensure marketplace is approved to transfer seller's OCC
        if (!occ.isApprovedForAll(msg.sender, address(this)))
            revert NotApproved();
        // Optional time sanity
        if (endTime != 0) require(endTime > startTime, "bad time");

        id = ++nextListingId;
        listings[id] = Listing({
            id: id,
            seller: msg.sender,
            tokenId: tokenId,
            remaining: amount,
            pricePerUnit: pricePerUnitWei,
            startTime: startTime,
            endTime: endTime,
            active: true
        });

        emit Listed(
            id,
            msg.sender,
            tokenId,
            amount,
            pricePerUnitWei,
            startTime,
            endTime
        );
    }

    // --- Update price and/or reduce remaining amount ---
    function updateListing(
        uint256 id,
        uint256 newPricePerUnitWei,
        uint256 newRemaining
    ) external {
        Listing storage l = listings[id];
        if (!l.active) revert NotActive();
        if (msg.sender != l.seller) revert NotSeller();
        require(newPricePerUnitWei > 0, "bad price");
        require(newRemaining > 0 && newRemaining <= l.remaining, "bad amount");
        l.pricePerUnit = newPricePerUnitWei;
        l.remaining = newRemaining;
        emit ListingUpdated(id, newPricePerUnitWei, newRemaining);
    }

    // --- Cancel listing ---
    function cancel(uint256 id) external {
        Listing storage l = listings[id];
        if (!l.active) revert NotActive();
        if (msg.sender != l.seller) revert NotSeller();
        l.active = false;
        emit ListingCancelled(id);
    }

    // --- Buy (pay CELO) ---
    function buy(uint256 id, uint256 quantity) external payable nonReentrant {
        Listing storage l = listings[id];
        if (!l.active) revert NotActive();
        if (quantity == 0 || quantity > l.remaining) revert InvalidQuantity();

        // Time window checks
        if (l.startTime != 0) {
            if (block.timestamp < l.startTime) revert TimeWindow();
        }
        if (l.endTime != 0) {
            if (block.timestamp > l.endTime) revert TimeWindow();
        }

        uint256 total = l.pricePerUnit * quantity;
        if (msg.value != total) revert WrongValue();

        // Pull transfer the OCC from seller to buyer (requires pre-approval)
        // Data field can carry optional memo; empty here.
        occ.safeTransferFrom(l.seller, msg.sender, l.tokenId, quantity, "");

        // Account for fees and pay seller & protocol
        uint256 fee = (total * feeBps) / 10_000;
        uint256 payout = total - fee;

        if (fee > 0) payable(feeRecipient).sendValue(fee);
        payable(l.seller).sendValue(payout);

        // Update remaining & possibly close listing
        l.remaining -= quantity;
        if (l.remaining == 0) {
            l.active = false;
        }

        emit Purchased(id, msg.sender, quantity, total, fee);
    }

    // --- Fallbacks (reject stray CELO) ---
    receive() external payable {
        revert WrongValue();
    }

    fallback() external payable {
        revert WrongValue();
    }
}
