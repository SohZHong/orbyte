// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CarbonCreditToken (ERC-1155)
 * @notice
 * - Minting restricted to the *owner* (ProjectRegistry).
 * - Burning (retirement) allowed by the *token holder themselves*.
 * - Optional: registry can also burn on behalf (for corrections, if needed).
 * - Each tokenId = one issuance batch; amount = tons of CO2e.
 */
contract CarbonCreditToken is ERC1155, Ownable {
    uint256 public nextTokenId;

    string public name = "Orbyte Carbon Credit";
    string public symbol = "OCC";

    mapping(uint256 => string) private _tokenURIs;

    constructor(
        string memory defaultURI
    ) ERC1155(defaultURI) Ownable(msg.sender) {}

    function uri(uint256 id) public view override returns (string memory) {
        string memory stored = _tokenURIs[id];
        return bytes(stored).length == 0 ? super.uri(id) : stored;
    }

    function _setURI(uint256 id, string memory newuri) internal {
        _tokenURIs[id] = newuri;
        emit URI(newuri, id);
    }

    /**
     * @dev Only the registry (owner) can mint new credits.
     */
    function mint(
        address to,
        uint256 amount,
        string calldata tokenURI_
    ) external onlyOwner returns (uint256 tokenId) {
        tokenId = ++nextTokenId;
        _mint(to, tokenId, amount, "");
        _setURI(tokenId, tokenURI_);
    }

    /**
     * @dev Burn (retire) credits.
     * - Allow holder to burn their own tokens (msg.sender == from).
     * - Also allow contract owner (ProjectRegistry) to burn on behalf of holder, so registry.retireCredits can forward.
     */
    function burn(address from, uint256 id, uint256 amount) external {
        require(
            msg.sender == from || msg.sender == owner(),
            "Not authorized to burn"
        );
        // check balance of the actual holder
        require(balanceOf(from, id) >= amount, "insufficient balance");
        _burn(from, id, amount);
    }
}
