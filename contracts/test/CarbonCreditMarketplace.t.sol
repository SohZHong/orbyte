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

        // Approve market
        vm.prank(dev);
        token.setApprovalForAll(address(market), true);
    }

    function test_ListAndBuy() public {
        uint256 price = 1 ether;

        // Dev lists 50 credits at 1 ether each
        vm.prank(dev);
        market.list(1, 50, price, 0, 0);

        // Buyer buys 10 credits
        vm.deal(buyer, 100 ether);
        vm.prank(buyer);
        market.buy{value: 10 ether}(1, 10);

        // Buyer should now own 10
        assertEq(token.balanceOf(buyer, 1), 10);

        // Dev should still own 90 (100 - 50 listed + 40 remaining unsold)
        assertEq(token.balanceOf(dev, 1), 90);

        // Listing should have 40 left
        (, , , uint256 remaining, , , , ) = market.listings(1);
        assertEq(remaining, 40);
    }
}
