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
        uint8 r = roles[who];
        if (r != 0 || who == address(0x1)) return r; // keep dev = 0
        return 255; // 255 = unassigned
    }
}

contract MockCarbonCreditToken {
    uint256 public nextId = 1;

    struct Credit {
        address to;
        uint256 amount;
        string uri;
    }
    mapping(uint256 => Credit) public credits;

    function mint(
        address to,
        uint256 amount,
        string calldata tokenURI_
    ) external returns (uint256 tokenId) {
        tokenId = nextId++;
        credits[tokenId] = Credit(to, amount, tokenURI_);
    }

    function burn(address from, uint256 tokenId, uint256 amount) external {
        Credit storage c = credits[tokenId];
        require(c.to == from, "not token owner");
        require(c.amount >= amount, "insufficient balance");
        c.amount -= amount;
    }
}

contract ProjectRegistryTest is Test {
    ProjectRegistry registry;
    MockRoleToken roleToken;
    CarbonCreditToken creditToken;

    address dev = address(0x1);
    address auditor1 = address(0x2);
    address auditor2 = address(0x3);
    address outsider = address(0x4);

    function setUp() public {
        roleToken = new MockRoleToken();
        creditToken = new CarbonCreditToken("");

        // roles: 0 = Developer, 1 = Auditor
        roleToken.setRole(dev, 0);
        roleToken.setRole(auditor1, 1);
        roleToken.setRole(auditor2, 1);

        registry = new ProjectRegistry(
            address(roleToken),
            address(creditToken),
            2, // proposalApprovalThreshold
            2 // proofApprovalThreshold
        );
    }

    function _defaultMeta()
        internal
        pure
        returns (ProjectRegistry.ProposalMeta memory)
    {
        return
            ProjectRegistry.ProposalMeta({
                name: "Solar Project",
                description: "Install solar panels",
                location: "Kenya",
                estimatedCredits: 1000,
                standard: ProjectRegistry.Standard.GOLD_STANDARD,
                vintage: 2025,
                methodology: "SolarMethodologyV1",
                projectPlanCID: "planCID",
                eiaCID: "eiaCID",
                otherDocsCID: "otherDocsCID",
                metadataCID: "metaCID"
            });
    }

    function test_SubmitProposal() public {
        vm.prank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());
        (
            string memory name,
            ,
            ProjectRegistry.ProjectStatus status,

        ) = registry.getProject(id);
        assertEq(name, "Solar Project");
        assertEq(uint(status), uint(ProjectRegistry.ProjectStatus.None));
    }

    function test_ReviewProposalAndApprove() public {
        vm.startPrank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());
        vm.stopPrank();

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
    }

    function test_ReviewProposalRequestChanges() public {
        vm.prank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());

        vm.prank(auditor1);
        registry.reviewProposal(
            id,
            ProjectRegistry.ReviewAction.REQUEST_CHANGES,
            "cid"
        );

        (, , ProjectRegistry.ProposalStatus proposalStatus, , ) = registry
            .getProjectBasic(id);
        assertEq(
            uint(proposalStatus),
            uint(ProjectRegistry.ProposalStatus.ChangesRequested)
        );
    }

    function test_ResubmitProposal() public {
        vm.startPrank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());
        vm.stopPrank();

        vm.prank(auditor1);
        registry.reviewProposal(
            id,
            ProjectRegistry.ReviewAction.REQUEST_CHANGES,
            "cid"
        );

        ProjectRegistry.ProposalMeta memory newMeta = _defaultMeta();
        newMeta.name = "Updated Solar Project";

        vm.prank(dev);
        registry.resubmitProposal(id, newMeta);

        (string memory name, , , , ) = registry.getProjectBasic(id);
        assertEq(name, "Updated Solar Project");
    }

    function test_SubmitAndApproveProof() public {
        vm.startPrank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());
        vm.stopPrank();

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

        vm.prank(dev);
        registry.submitProof(id, "proofCID");

        vm.prank(auditor1);
        registry.auditProof(id, ProjectRegistry.ReviewAction.APPROVE, "audit1");
        vm.prank(auditor2);
        registry.auditProof(id, ProjectRegistry.ReviewAction.APPROVE, "audit2");

        (, , , ProjectRegistry.ProjectStatus status) = registry.getProjectProof(
            id
        );
        assertEq(uint(status), uint(ProjectRegistry.ProjectStatus.Finalized));
    }

    function test_AuditProofReject() public {
        vm.startPrank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());
        vm.stopPrank();

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

        vm.prank(dev);
        registry.submitProof(id, "proofCID");

        vm.prank(auditor1);
        registry.auditProof(id, ProjectRegistry.ReviewAction.REJECT, "audit1");

        (, , , ProjectRegistry.ProjectStatus status) = registry.getProjectProof(
            id
        );
        assertEq(
            uint(status),
            uint(ProjectRegistry.ProjectStatus.AuditRejected)
        );
    }

    function test_NonDevCannotSubmitProposal() public {
        vm.expectRevert("not developer");
        vm.prank(outsider);
        registry.submitProposal(_defaultMeta());
    }

    function test_DevCannotReviewProposal() public {
        vm.prank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());

        vm.expectRevert("not auditor");
        vm.prank(dev);
        registry.reviewProposal(
            id,
            ProjectRegistry.ReviewAction.APPROVE,
            "cid"
        );
    }

    function test_CannotDoubleVoteProposal() public {
        vm.prank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());

        vm.prank(auditor1);
        registry.reviewProposal(
            id,
            ProjectRegistry.ReviewAction.APPROVE,
            "cid1"
        );

        vm.expectRevert("already voted");
        vm.prank(auditor1);
        registry.reviewProposal(
            id,
            ProjectRegistry.ReviewAction.APPROVE,
            "cid2"
        );
    }

    function test_CannotDoubleVoteProof() public {
        vm.startPrank(dev);
        uint256 id = registry.submitProposal(_defaultMeta());
        vm.stopPrank();

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

        vm.prank(dev);
        registry.submitProof(id, "proofCID");

        vm.prank(auditor1);
        registry.auditProof(id, ProjectRegistry.ReviewAction.APPROVE, "audit1");

        vm.expectRevert("already voted");
        vm.prank(auditor1);
        registry.auditProof(id, ProjectRegistry.ReviewAction.APPROVE, "audit2");
    }

    function test_RetireCredits() public {
        // Mint credits to dev (simulating issuance)
        uint256 tokenId = creditToken.mint(dev, 100, "uri");

        // Expect the retirement event
        vm.expectEmit(true, true, false, true);
        emit ProjectRegistry.CreditsRetired(dev, tokenId, 40, "retirementCID");

        // Retire 40 credits
        vm.prank(dev);
        registry.retireCredits(tokenId, 40, "retirementCID");

        // Verify dev balance reduced
        assertEq(creditToken.balanceOf(dev, tokenId), 60);
    }
}
