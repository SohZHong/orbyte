// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @dev roleOf(address) returns: 0 = Developer, 1 = Auditor
 */
interface IRoleToken {
    function roleOf(address who) external view returns (uint8);
}

interface ICarbonCreditToken {
    function mint(
        address to,
        uint256 amount,
        string calldata tokenURI_
    ) external returns (uint256 tokenId);
}

/**
 * @title ProjectRegistry (Adminless)
 * @notice Full lifecycle with only roles (Developer/Auditor). No owner, no admins.
 *         - Developers submit proposals with metadata + doc CIDs (IPFS).
 *         - Auditors review: APPROVE / REQUEST_CHANGES / REJECT.
 *         - After APPROVED → project InProgress (off-chain work).
 *         - Developer submits proof (CID).
 *         - Auditors audit proof; when approvals hit threshold → credits auto-mint (ERC-1155).
 */
contract ProjectRegistry {
    // Roles matching RoleToken
    uint8 private constant ROLE_DEVELOPER = 0;
    uint8 private constant ROLE_AUDITOR = 1;

    IRoleToken public immutable roleToken;
    ICarbonCreditToken public immutable creditToken;

    // thresholds set at deploy-time
    uint256 public immutable proposalApprovalThreshold;
    uint256 public immutable proofApprovalThreshold;

    // Standards supported
    enum Standard {
        GOLD_STANDARD,
        VCS,
        SHARIAH
    }

    // Proposal and Project states
    enum ProposalStatus {
        PendingReview,
        ChangesRequested,
        Rejected,
        Approved
    }
    enum ProjectStatus {
        None,
        InProgress,
        ProofSubmitted,
        AuditRejected,
        Finalized
    }

    // Review actions
    enum ReviewAction {
        APPROVE,
        REQUEST_CHANGES,
        REJECT
    }

    struct ProposalMeta {
        string name;
        string description;
        string location;
        uint256 estimatedCredits; // intended reduction (tons CO2e)
        Standard standard; // GOLD_STANDARD | VCS | SHARIAH
        uint16 vintage; // e.g. 2025
        string methodology;
        // Documents (IPFS CIDs)
        string projectPlanCID;
        string eiaCID; // Environmental Impact Assessment
        string otherDocsCID; // additional pack/listing
        string metadataCID; // full JSON metadata (also usable as tokenURI)
    }

    // Efficient per-round vote tracking
    struct VoteState {
        uint64 round; // bump on resubmission or new proof
        uint32 approvals;
        uint32 rejections;
        mapping(address => uint64) lastVotedRound; // auditor => round
    }

    struct Project {
        uint256 id;
        address developer;
        ProposalMeta meta;
        ProposalStatus proposalStatus;
        ProjectStatus projectStatus;
        // Voting states
        VoteState proposalVotes;
        VoteState proofVotes;
        // Proof of completion (CID)
        string proofCID;
        bool creditsIssued;
    }

    uint256 public projectCounter;
    mapping(uint256 => Project) private projects;

    // ---- Events ----
    event ProjectProposed(
        uint256 indexed id,
        address indexed developer,
        ProposalMeta meta
    );
    event ProposalReviewed(
        uint256 indexed id,
        address indexed auditor,
        ReviewAction action,
        string commentCID
    );
    event ProposalStatusChanged(uint256 indexed id, ProposalStatus newStatus);

    event ProofSubmitted(
        uint256 indexed id,
        address indexed developer,
        string proofCID
    );
    event ProofAudited(
        uint256 indexed id,
        address indexed auditor,
        ReviewAction action,
        string commentCID
    );
    event ProjectStatusChanged(uint256 indexed id, ProjectStatus newStatus);

    event CreditsIssued(
        uint256 indexed id,
        address indexed developer,
        uint256 amount,
        uint256 tokenId,
        string tokenURI
    );

    // ---- Constructor ----
    constructor(
        address roleToken_,
        address creditToken_,
        uint256 proposalApprovalThreshold_,
        uint256 proofApprovalThreshold_
    ) {
        require(
            roleToken_ != address(0) && creditToken_ != address(0),
            "zero addr"
        );
        require(
            proposalApprovalThreshold_ > 0 && proofApprovalThreshold_ > 0,
            "bad thresholds"
        );

        roleToken = IRoleToken(roleToken_);
        creditToken = ICarbonCreditToken(creditToken_);
        proposalApprovalThreshold = proposalApprovalThreshold_;
        proofApprovalThreshold = proofApprovalThreshold_;
    }

    // ---- Role helpers ----
    function _isDev(address who) internal view returns (bool) {
        return roleToken.roleOf(who) == ROLE_DEVELOPER;
    }

    function _isAuditor(address who) internal view returns (bool) {
        return roleToken.roleOf(who) == ROLE_AUDITOR;
    }

    // ---- Submit proposal (Developer only) ----
    function submitProposal(
        ProposalMeta calldata meta
    ) external returns (uint256 id) {
        require(_isDev(msg.sender), "not developer");

        id = ++projectCounter;

        Project storage p = projects[id];
        p.id = id;
        p.developer = msg.sender;
        p.meta = meta;

        p.proposalStatus = ProposalStatus.PendingReview;
        p.projectStatus = ProjectStatus.None;

        // start proposal voting round at 1
        p.proposalVotes.round = 1;

        emit ProjectProposed(id, msg.sender, meta);
        emit ProposalStatusChanged(id, ProposalStatus.PendingReview);
    }

    // ---- Auditor reviews the proposal ----
    function reviewProposal(
        uint256 id,
        ReviewAction action,
        string calldata commentCID
    ) external {
        require(_isAuditor(msg.sender), "not auditor");
        Project storage p = projects[id];
        require(p.id != 0, "no project");
        require(
            p.proposalStatus == ProposalStatus.PendingReview ||
                p.proposalStatus == ProposalStatus.ChangesRequested,
            "proposal closed"
        );

        VoteState storage v = p.proposalVotes;
        uint64 r = v.round;
        require(v.lastVotedRound[msg.sender] != r, "already voted");
        require(p.developer != msg.sender, "dev cannot review own");

        v.lastVotedRound[msg.sender] = r;

        if (action == ReviewAction.APPROVE) {
            v.approvals += 1;
            if (v.approvals >= proposalApprovalThreshold) {
                p.proposalStatus = ProposalStatus.Approved;
                emit ProposalStatusChanged(id, ProposalStatus.Approved);

                p.projectStatus = ProjectStatus.InProgress;
                emit ProjectStatusChanged(id, ProjectStatus.InProgress);
            }
        } else if (action == ReviewAction.REQUEST_CHANGES) {
            p.proposalStatus = ProposalStatus.ChangesRequested;
            // Reset tallies and bump round
            v.approvals = 0;
            v.rejections = 0;
            v.round += 1;
            emit ProposalStatusChanged(id, ProposalStatus.ChangesRequested);
        } else {
            // REJECT
            v.rejections += 1;
            p.proposalStatus = ProposalStatus.Rejected;
            // Reset approvals
            v.approvals = 0;
            emit ProposalStatusChanged(id, ProposalStatus.Rejected);
        }

        emit ProposalReviewed(id, msg.sender, action, commentCID);
    }

    // ---- Resubmit updated proposal metadata (Developer only) ----
    function resubmitProposal(
        uint256 id,
        ProposalMeta calldata newMeta
    ) external {
        Project storage p = projects[id];
        require(p.id != 0, "no project");
        require(msg.sender == p.developer, "not developer");
        require(
            p.proposalStatus == ProposalStatus.ChangesRequested,
            "not awaiting changes"
        );

        p.meta = newMeta;
        p.proposalStatus = ProposalStatus.PendingReview;

        // ensure voting round is open
        if (p.proposalVotes.round == 0) p.proposalVotes.round = 1;

        emit ProjectProposed(id, msg.sender, newMeta);
        emit ProposalStatusChanged(id, ProposalStatus.PendingReview);
    }

    // ---- Developer submits proof after work is done ----
    function submitProof(uint256 id, string calldata proofCID) external {
        Project storage p = projects[id];
        require(p.id != 0, "no project");
        require(msg.sender == p.developer, "not developer");
        require(
            p.proposalStatus == ProposalStatus.Approved,
            "proposal not approved"
        );
        require(
            p.projectStatus == ProjectStatus.InProgress ||
                p.projectStatus == ProjectStatus.AuditRejected,
            "wrong state"
        );

        p.proofCID = proofCID;
        p.projectStatus = ProjectStatus.ProofSubmitted;

        // reset proof votes and bump round
        p.proofVotes.approvals = 0;
        p.proofVotes.rejections = 0;
        p.proofVotes.round += 1;
        if (p.proofVotes.round == 0) p.proofVotes.round = 1; // handle first submit

        emit ProofSubmitted(id, msg.sender, proofCID);
        emit ProjectStatusChanged(id, ProjectStatus.ProofSubmitted);
    }

    // ---- Auditor audits the proof ----
    function auditProof(
        uint256 id,
        ReviewAction action,
        string calldata commentCID
    ) external {
        require(_isAuditor(msg.sender), "not auditor");
        Project storage p = projects[id];
        require(p.id != 0, "no project");
        require(
            p.projectStatus == ProjectStatus.ProofSubmitted,
            "no proof to audit"
        );
        require(p.developer != msg.sender, "dev cannot audit own");

        VoteState storage v = p.proofVotes;
        uint64 r = v.round;
        require(r != 0, "proof round not started");
        require(v.lastVotedRound[msg.sender] != r, "already voted");

        v.lastVotedRound[msg.sender] = r;

        if (action == ReviewAction.APPROVE) {
            v.approvals += 1;
            if (v.approvals >= proofApprovalThreshold) {
                _issueCredits(id, p);
            }
        } else if (action == ReviewAction.REQUEST_CHANGES) {
            p.projectStatus = ProjectStatus.InProgress;
            // reset for next submission
            v.approvals = 0;
            v.rejections = 0;
            emit ProjectStatusChanged(id, ProjectStatus.InProgress);
        } else {
            // REJECT
            v.rejections += 1;
            p.projectStatus = ProjectStatus.AuditRejected;
            emit ProjectStatusChanged(id, ProjectStatus.AuditRejected);
        }

        emit ProofAudited(id, msg.sender, action, commentCID);
    }

    // ---- Internal: mint credits & finalize ----
    function _issueCredits(uint256 id, Project storage p) internal {
        require(!p.creditsIssued, "already issued");
        // Use the proposal's metadataCID as the tokenURI (embed standard/vintage/etc in that JSON).
        uint256 tokenId = creditToken.mint(
            p.developer,
            p.meta.estimatedCredits,
            p.meta.metadataCID
        );

        p.creditsIssued = true;
        p.projectStatus = ProjectStatus.Finalized;

        emit CreditsIssued(
            id,
            p.developer,
            p.meta.estimatedCredits,
            tokenId,
            p.meta.metadataCID
        );
        emit ProjectStatusChanged(id, ProjectStatus.Finalized);
    }

    function getProject(
        uint256 projectId
    )
        external
        view
        returns (
            string memory name,
            address developer,
            ProjectStatus status,
            uint256 approvedCredits
        )
    {
        Project storage p = projects[projectId];
        return (
            string(p.meta.name),
            p.developer,
            p.projectStatus,
            p.meta.estimatedCredits
        );
    }

    function getProjectBasic(
        uint256 id
    )
        external
        view
        returns (
            string memory name,
            address developer,
            ProposalStatus proposalStatus,
            ProjectStatus projectStatus,
            bool creditsIssued
        )
    {
        Project storage p = projects[id];
        require(p.id != 0, "no project");
        return (
            p.meta.name,
            p.developer,
            p.proposalStatus,
            p.projectStatus,
            p.creditsIssued
        );
    }

    // Proposal tallies
    function getProposalTallies(
        uint256 id
    ) external view returns (uint256 approvals, uint256 rejections) {
        Project storage p = projects[id];
        require(p.id != 0, "no project");
        return (p.proposalVotes.approvals, p.proposalVotes.rejections);
    }

    // Proof info
    function getProjectProof(
        uint256 id
    )
        external
        view
        returns (
            string memory proofCID,
            uint256 approvals,
            uint256 rejections,
            ProjectStatus status
        )
    {
        Project storage p = projects[id];
        require(p.id != 0, "no project");
        return (
            p.proofCID,
            p.proofVotes.approvals,
            p.proofVotes.rejections,
            p.projectStatus
        );
    }
}
