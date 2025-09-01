// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/CarbonCreditToken.sol";
import "../src/CarbonCreditMarketplace.sol";

contract MarketplaceTest is Test {
    CarbonCreditToken token;
    CarbonCreditMarketplace market;

    address dev = address(0xD1);
    address buyer = address(0xB1);

    function setUp() public {
        token = new CarbonCreditToken("ipfs://default/");
        market = new CarbonCreditMarketplace(
            address(token),
            dev, // feeRecipient
            0 // no fee for test
        );

        // Mint 100 credits (id=1) to dev
        token.mint(dev, 100, "ipfs://meta");
    }

    function test_ListAndBuy() public {
        // Approve market
        vm.prank(dev);
        token.setApprovalForAll(address(market), true);

        uint256 price = 1 ether;

        // Dev lists 50 credits at 1 ether each
        vm.prank(dev);
        uint256 listingId = market.list(1, 50, price, 0, 0);

        // Buyer buys 10 credits
        vm.deal(buyer, 100 ether);
        vm.prank(buyer);
        market.buy{value: 10 ether}(listingId, 10);

        // Buyer should now own 10
        assertEq(token.balanceOf(buyer, 1), 10);

        // Dev should still own 90 (100 - 10 sold)
        assertEq(token.balanceOf(dev, 1), 90);

        // Listing should have 40 left
        (, , , uint256 remaining, , , , ) = market.listings(listingId);
        assertEq(remaining, 40);
    }

    function test_NotApproved() public {
        uint256 price = 1 ether;

        vm.prank(dev);
        vm.expectRevert(
            abi.encodeWithSelector(CarbonCreditMarketplace.NotApproved.selector)
        );
        market.list(1, 10, price, 0, 0);
    }

    function test_NotSellerCancels() public {
        // Approve & list normally
        vm.prank(dev);
        token.setApprovalForAll(address(market), true);

        vm.prank(dev);
        uint256 listingId = market.list(1, 20, 1 ether, 0, 0);

        vm.prank(buyer);
        vm.expectRevert(
            abi.encodeWithSelector(CarbonCreditMarketplace.NotSeller.selector)
        );
        market.cancel(listingId);
    }

    function test_BuyInvalidQuantity_Zero() public {
        // Approve & list normally
        vm.prank(dev);
        token.setApprovalForAll(address(market), true);

        vm.prank(dev);
        uint256 listingId = market.list(1, 20, 1 ether, 0, 0);

        // quantity == 0 should revert InvalidQuantity()
        vm.prank(buyer);
        vm.deal(buyer, 10 ether);
        vm.expectRevert(
            abi.encodeWithSelector(
                CarbonCreditMarketplace.InvalidQuantity.selector
            )
        );
        market.buy{value: 0}(listingId, 0);
    }

    function test_BuyExceedsQuantity() public {
        // Approve & list normally
        vm.prank(dev);
        token.setApprovalForAll(address(market), true);

        vm.prank(dev);
        uint256 listingId = market.list(1, 50, 1 ether, 0, 0);

        // Try to buy more than remaining -> InvalidQuantity()
        vm.prank(buyer);
        vm.deal(buyer, 100 ether);
        vm.expectRevert(
            abi.encodeWithSelector(
                CarbonCreditMarketplace.InvalidQuantity.selector
            )
        );
        market.buy{value: 60 ether}(listingId, 60);
    }

    function test_WrongValueSent() public {
        // Approve & list normally
        vm.prank(dev);
        token.setApprovalForAll(address(market), true);

        vm.prank(dev);
        uint256 listingId = market.list(1, 20, 2 ether, 0, 0);

        // Send wrong value (should be price * qty = 2 * 3 = 6 ether). Send 5 ether -> WrongValue()
        vm.prank(buyer);
        vm.deal(buyer, 10 ether);
        vm.expectRevert(
            abi.encodeWithSelector(CarbonCreditMarketplace.WrongValue.selector)
        );
        market.buy{value: 5 ether}(listingId, 3);
    }

    function test_TimeWindowNotStarted() public {
        // Approve & list with future startTime
        vm.prank(dev);
        token.setApprovalForAll(address(market), true);

        uint64 future = uint64(block.timestamp + 1 days);
        vm.prank(dev);
        uint256 listingId = market.list(
            1,
            10,
            1 ether,
            future,
            future + 1 days
        );

        // attempt to buy before start -> TimeWindow()
        vm.prank(buyer);
        vm.deal(buyer, 10 ether);
        vm.expectRevert(
            abi.encodeWithSelector(CarbonCreditMarketplace.TimeWindow.selector)
        );
        market.buy{value: 1 ether}(listingId, 1);
    }

    function test_TimeWindowExpired() public {
        // Approve & list with valid start/end
        vm.prank(dev);
        token.setApprovalForAll(address(market), true);

        uint64 start = uint64(block.timestamp);
        uint64 end = uint64(block.timestamp + 1 days);
        vm.prank(dev);
        uint256 listingId = market.list(1, 10, 1 ether, start, end);

        // move time forward beyond end
        vm.warp(end + 1);

        // attempt to buy after expiry
        vm.prank(buyer);
        vm.deal(buyer, 10 ether);
        vm.expectRevert(
            abi.encodeWithSelector(CarbonCreditMarketplace.TimeWindow.selector)
        );
        market.buy{value: 1 ether}(listingId, 1);
    }
}
