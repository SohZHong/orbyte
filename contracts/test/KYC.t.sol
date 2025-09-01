// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Test, console} from "forge-std/Test.sol";
import {KYC} from "../src/KYC.sol";

contract KYCTest is Test {
    KYC kyc;
    address user = address(0x123);

    function setUp() public {
        kyc = new KYC();
    }

    function test_SubmitKYC() public {
        vm.prank(user);
        kyc.submitKYC(
            KYC.Role.Auditor,
            "QmDocumentCid",
            "QmProofCid",
            "QmCertificationCid"
        );

        KYC.KYCData memory data = kyc.getKYC(user);
        assertEq(uint(data.role), uint(KYC.Role.Auditor));
        assertEq(data.documentCid, "QmDocumentCid");
        assertEq(data.proofOfAddressCid, "QmProofCid");
        assertEq(data.certificationCid, "QmCertificationCid");
    }

    function test_InvalidDocumentCid() public {
        vm.prank(user);
        vm.expectRevert("Document CID required");
        kyc.submitKYC(
            KYC.Role.Developer,
            "",
            "QmProofCid",
            "QmCertificationCid"
        );
    }

    function test_InvalidProofOfAddressCid() public {
        vm.prank(user);
        vm.expectRevert("Proof of Address CID required");
        kyc.submitKYC(
            KYC.Role.Developer,
            "QmDocumentCid",
            "",
            "QmCertificationCid"
        );
    }
}
