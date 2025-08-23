// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract KYC {
    enum Role {
        Developer,
        Auditor
    }

    struct KYCData {
        Role role;
        string documentCid;
        string proofOfAddressCid;
        string certificationCid;
        uint256 submittedAt;
    }

    // Mapping of user address to KYC submission
    mapping(address => KYCData) public kycRecords;

    // Event emitted when KYC is submitted
    event KYCSubmitted(
        address indexed user,
        Role role,
        string documentCid,
        string proofOfAddressCid,
        string certificationCid,
        uint256 timestamp
    );

    // Submit KYC data
    function submitKYC(
        Role role,
        string memory documentCid,
        string memory proofOfAddressCid,
        string memory certificationCid
    ) external {
        require(bytes(documentCid).length > 0, "Document CID required");
        require(
            bytes(proofOfAddressCid).length > 0,
            "Proof of Address CID required"
        );

        kycRecords[msg.sender] = KYCData({
            role: role,
            documentCid: documentCid,
            proofOfAddressCid: proofOfAddressCid,
            certificationCid: certificationCid,
            submittedAt: block.timestamp
        });

        emit KYCSubmitted(
            msg.sender,
            role,
            documentCid,
            proofOfAddressCid,
            certificationCid,
            block.timestamp
        );
    }

    // Retrieve KYC data for a user
    function getKYC(address user) external view returns (KYCData memory) {
        return kycRecords[user];
    }
}
