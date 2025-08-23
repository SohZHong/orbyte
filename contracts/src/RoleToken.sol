// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoleToken is ERC721, Ownable {
    uint256 private _nextTokenId;
    string private _baseTokenURI;

    enum Role {
        Developer,
        Auditor
    }
    mapping(uint256 => Role) public tokenRoles; // tokenId -> Role
    mapping(address => bool) public hasToken;
    mapping(address => Role) public roleOfAccount; // NEW

    event RoleMinted(address indexed account, uint256 tokenId, Role role);
    event RoleBurned(address indexed account, uint256 tokenId, Role role);

    constructor(
        string memory baseURI
    ) ERC721("Role Token", "ROLE") Ownable(msg.sender) {
        _baseTokenURI = baseURI;
    }

    // Mint token to specific wallet address
    function mint(address to, Role role) external onlyOwner {
        require(!hasToken[to], "Already has a role token");

        uint256 tokenId = _nextTokenId++;
        _safeMint(to, tokenId);

        tokenRoles[tokenId] = role;
        hasToken[to] = true;
        roleOfAccount[to] = role; // NEW

        emit RoleMinted(to, tokenId, role);
    }

    function burn(uint256 tokenId) external onlyOwner {
        address owner = ownerOf(tokenId);
        Role role = tokenRoles[tokenId];

        _burn(tokenId);

        hasToken[owner] = false;
        delete tokenRoles[tokenId];
        delete roleOfAccount[owner]; // NEW

        emit RoleBurned(owner, tokenId, role);
    }

    // Simple view for external contracts
    function roleOf(address who) external view returns (uint8) {
        require(hasToken[who], "No role");
        return uint8(roleOfAccount[who]); // 0 = Developer, 1 = Auditor
    }

    // View role data
    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");

        Role role = tokenRoles[tokenId];

        if (role == Role.Developer)
            return string(abi.encodePacked(_baseTokenURI, "developer.json"));
        if (role == Role.Auditor)
            return string(abi.encodePacked(_baseTokenURI, "auditor.json"));

        revert("Invalid role");
    }

    // Disable updates
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override returns (address) {
        address from = _ownerOf(tokenId);
        require(
            from == address(0) || to == address(0),
            "Soulbound: Transfers disabled"
        );
        return super._update(to, tokenId, auth);
    }
}
