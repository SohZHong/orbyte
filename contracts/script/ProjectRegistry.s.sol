// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {RoleToken} from "../src/RoleToken.sol";
import {CarbonCreditToken} from "../src/CarbonCreditToken.sol";
import {ProjectRegistry} from "../src/ProjectRegistry.sol";
import {CarbonCreditMarketplace} from "../src/CarbonCreditMarketplace.sol";

contract ProjectRegistryScript is Script {
    function setUp() public {}

    function run() public {
        vm.createSelectFork("alfajores");
        vm.startBroadcast();

        CarbonCreditToken creditToken = new CarbonCreditToken("ipfs://");

        // 3️Deploy ProjectRegistry with thresholds
        ProjectRegistry registry = new ProjectRegistry(
            address(0x69b447e31efAAf60E455d00363c652C8e71a6b33), //predeployed role token
            address(creditToken),
            2,
            2
        );

        creditToken.transferOwnership(address(registry));

        CarbonCreditMarketplace market = new CarbonCreditMarketplace(
            address(creditToken),
            msg.sender, // feeRecipient
            250 // 2.5% fee in basis points
        );

        vm.stopBroadcast();

        console.log("Deployment complete!");
        console.log("Registry address:", address(registry));
        console.log("CreditToken address:", address(creditToken));
        console.log("Marketplace address:", address(market));
    }
}
