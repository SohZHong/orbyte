// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {RoleToken} from "../src/RoleToken.sol";

contract RoleTokenScript is Script {
    RoleToken public token;

    function setUp() public {}

    function run() public {
        vm.createSelectFork("alfajores");
        vm.startBroadcast();

        token = new RoleToken(
            "https://ipfs.io/ipfs/bafybeifhexq5qszws7xng6cwifaonkjaz676iu5hsuhjazk44liqzyn2xy/"
        );

        console.log("RoleToken contract deployed at:", address(token));

        vm.stopBroadcast();
    }
}
