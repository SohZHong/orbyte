// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {RoleToken} from "../src/RoleToken.sol";
import {CarbonCreditToken} from "../src/CarbonCreditToken.sol";
import {ProjectRegistry} from "../src/ProjectRegistry.sol";

contract CounterScript is Script {
    RoleToken public token;

    function setUp() public {}

    function run() public {
        vm.createSelectFork("alfajores");
        vm.startBroadcast();

        CarbonCreditToken creditToken = new CarbonCreditToken("ipfs://");
        token = new RoleToken(
            "https://ipfs.io/ipfs/bafybeifhexq5qszws7xng6cwifaonkjaz676iu5hsuhjazk44liqzyn2xy/"
        );

        // 3️Deploy ProjectRegistry with thresholds
        ProjectRegistry registry = new ProjectRegistry(
            address(token),
            address(creditToken),
            2,
            2
        );

        creditToken.transferOwnership(address(registry));
        vm.stopBroadcast();

        console.log("Deployment complete!");
        console.log("Registry address:", address(registry));
        console.log("Role Token address:", address(token));
        console.log("CreditToken address:", address(creditToken));
    }
}
