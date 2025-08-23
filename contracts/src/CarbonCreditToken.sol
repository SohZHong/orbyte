// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {ERC1155} from "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CarbonCreditToken (ERC-1155)
 * @notice Mint/burn restricted to the *owner*, which should be the ProjectRegistry contract.
 *         Set owner by calling transferOwnership(registryAddr) once.
 *         Each tokenId = one issuance batch; amount = tons of CO2e.
 */
contract CarbonCreditToken is ERC1155, Ownable {
    uint256 public nextTokenId;

    string public name = "Orbyte Carbon Credit";
    string public symbol = "OCC";

    constructor(
        string memory defaultURI
    ) ERC1155(defaultURI) Ownable(msg.sender) {}

    // tokenId-specific URIs
    mapping(uint256 => string) private _tokenURIs;

    function uri(uint256 id) public view override returns (string memory) {
        string memory stored = _tokenURIs[id];
        return bytes(stored).length == 0 ? super.uri(id) : stored;
    }

    function _setURI(uint256 id, string memory newuri) internal {
        _tokenURIs[id] = newuri;
        emit URI(newuri, id);
    }

    /**
     * @dev Only the registry (owner) can mint.
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
     * @dev Only the registry (owner) can burn (e.g., retirement/corrections).
     */
    function burn(address from, uint256 id, uint256 amount) external onlyOwner {
        _burn(from, id, amount);
    }
}
