// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/ProjectRegistry.sol";
import "../src/CarbonCreditToken.sol";

contract MockRoleToken {
    mapping(address => uint8) public roles;

    function setRole(address who, uint8 role) external {
        roles[who] = role;
    }

    function roleOf(address who) external view returns (uint8) {
        return roles[who];
    }
}

contract CarbonCreditTokenTest is Test {
    ProjectRegistry registry;
    CarbonCreditToken creditToken;
    MockRoleToken roleToken;

    address dev = address(0x1);
    address auditor1 = address(0x2);
    address auditor2 = address(0x3);

    function setUp() public {
        roleToken = new MockRoleToken();
        creditToken = new CarbonCreditToken("ipfs://default");

        // Assign roles
        roleToken.setRole(dev, 0); // Developer
        roleToken.setRole(auditor1, 1); // Auditor
        roleToken.setRole(auditor2, 1);

        // Deploy registry
        registry = new ProjectRegistry(
            address(roleToken),
            address(creditToken),
            2,
            2
        );

        // Make registry the owner of the credit token
        creditToken.transferOwnership(address(registry));
    }

    function _defaultMeta()
        internal
        pure
        returns (ProjectRegistry.ProposalMeta memory)
    {
        return
            ProjectRegistry.ProposalMeta({
                name: "Wind Farm",
                description: "Wind turbines project",
                location: "Morocco",
                estimatedCredits: 500,
                standard: ProjectRegistry.Standard.VCS,
                vintage: 2026,
                methodology: "WindMethodologyV1",
                projectPlanCID: "planCID",
                eiaCID: "eiaCID",
                otherDocsCID: "otherDocsCID",
                metadataCID: "ipfs://metadata"
            });
    }

    function test_FullLifecycleAndMint() public {
        // Developer submits proposal
        vm.prank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());

        // Auditors approve proposal
        vm.prank(auditor1);
        registry.reviewProposal(
            id,
            ProjectRegistry.ReviewAction.APPROVE,
            "cid1"
        );
        vm.prank(auditor2);
        registry.reviewProposal(
            id,
            ProjectRegistry.ReviewAction.APPROVE,
            "cid2"
        );

        (, , ProjectRegistry.ProjectStatus status, ) = registry.getProject(id);
        assertEq(uint(status), uint(ProjectRegistry.ProjectStatus.InProgress));

        // Developer submits proof
        vm.prank(dev);
        registry.submitProof(id, "proofCID");

        // Auditors approve proof
        vm.prank(auditor1);
        registry.auditProof(id, ProjectRegistry.ReviewAction.APPROVE, "audit1");
        vm.prank(auditor2);
        registry.auditProof(id, ProjectRegistry.ReviewAction.APPROVE, "audit2");

        // Check project finalized
        (, , ProjectRegistry.ProjectStatus finalStatus, ) = registry.getProject(
            id
        );
        assertEq(
            uint(finalStatus),
            uint(ProjectRegistry.ProjectStatus.Finalized)
        );

        // Verify credits minted in CarbonCreditToken
        uint256 tokenId = creditToken.nextTokenId();
        assertEq(tokenId, 1);
        assertEq(creditToken.balanceOf(dev, tokenId), 500);
        assertEq(creditToken.uri(tokenId), "ipfs://metadata");
    }

    function test_OnlyRegistryCanMintOrBurn() public {
        vm.expectRevert();
        creditToken.mint(dev, 100, "uri");

        vm.expectRevert();
        creditToken.burn(dev, 1, 10);
    }

    function test_RetireCredits() public {
        // Simulate registry issuing credits directly
        vm.startPrank(address(registry));
        uint256 tokenId = creditToken.mint(dev, 100, "ipfs://credits");
        vm.stopPrank();

        // Expect event
        vm.expectEmit();
        emit ProjectRegistry.CreditsRetired(
            dev,
            tokenId,
            40,
            "ipfs://retire-info"
        );

        vm.prank(dev);
        registry.retireCredits(tokenId, 40, "ipfs://retire-info");

        // Balance reduced
        assertEq(creditToken.balanceOf(dev, tokenId), 60);
    }

    function test_UserCannotRetireOthersCredits() public {
        vm.startPrank(address(registry));
        uint256 tokenIdDev = creditToken.mint(dev, 100, "ipfs://credits-dev");
        uint256 tokenIdAuditor = creditToken.mint(
            auditor1,
            100,
            "ipfs://credits-auditor"
        );
        vm.stopPrank();

        // Auditor tries to burn Dev's credits which should fail
        vm.expectRevert();
        vm.prank(auditor1);
        registry.retireCredits(tokenIdDev, 10, "ipfs://retire-info");

        // Balances remain unchanged
        assertEq(creditToken.balanceOf(dev, tokenIdDev), 100);
        assertEq(creditToken.balanceOf(auditor1, tokenIdAuditor), 100);
    }

    function test_UserCanRetireOwnCredits() public {
        vm.startPrank(address(registry));
        uint256 tokenIdDev = creditToken.mint(dev, 100, "ipfs://credits-dev");
        uint256 tokenIdAuditor = creditToken.mint(
            auditor1,
            100,
            "ipfs://credits-auditor"
        );
        vm.stopPrank();

        // Auditor retires 10 of their own credits → should succeed
        vm.prank(auditor1);
        registry.retireCredits(tokenIdAuditor, 10, "ipfs://retire-info");

        // Balances updated correctly
        assertEq(creditToken.balanceOf(dev, tokenIdDev), 100); // untouched
        assertEq(creditToken.balanceOf(auditor1, tokenIdAuditor), 90); // 100 - 10
    }
}
