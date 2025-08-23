// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {KYC} from "../src/KYC.sol";

contract CounterScript is Script {
    KYC public kyc;

    function setUp() public {}

    function run() public {
        vm.createSelectFork("alfajores");
        vm.startBroadcast();

        kyc = new KYC();

        console.log("KYC contract deployed at:", address(kyc));

        vm.stopBroadcast();
    }
}
