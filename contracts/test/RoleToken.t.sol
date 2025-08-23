// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/RoleToken.sol";

contract RoleTokenTest is Test {
    RoleToken roleToken;
    address owner = address(this);
    address alice = address(0x1);
    address bob = address(0x2);

    function setUp() public {
        roleToken = new RoleToken(
            "https://ipfs.io/ipfs/bafybeifhexq5qszws7xng6cwifaonkjaz676iu5hsuhjazk44liqzyn2xy/"
        );
    }

    function test_MintDeveloperRole() public {
        roleToken.mint(alice, RoleToken.Role.Developer);

        assertEq(roleToken.ownerOf(0), alice);
        assertTrue(roleToken.hasToken(alice));
        assertEq(uint(roleToken.tokenRoles(0)), uint(RoleToken.Role.Developer));
        assertEq(
            roleToken.tokenURI(0),
            "https://ipfs.io/ipfs/bafybeifhexq5qszws7xng6cwifaonkjaz676iu5hsuhjazk44liqzyn2xy/developer.json"
        );
    }

    function test_MintAuditorRole() public {
        roleToken.mint(bob, RoleToken.Role.Auditor);

        assertEq(roleToken.ownerOf(0), bob);
        assertEq(uint(roleToken.tokenRoles(0)), uint(RoleToken.Role.Auditor));
        assertEq(
            roleToken.tokenURI(0),
            "https://ipfs.io/ipfs/bafybeifhexq5qszws7xng6cwifaonkjaz676iu5hsuhjazk44liqzyn2xy/auditor.json"
        );
    }

    function test_CannotMintTwiceToSameAddress() public {
        roleToken.mint(alice, RoleToken.Role.Developer);
        vm.expectRevert("Already has a role token");
        roleToken.mint(alice, RoleToken.Role.Auditor);
    }

    function test_OnlyOwnerCanMint() public {
        vm.prank(alice);
        vm.expectRevert(
            "OwnableUnauthorizedAccount(0x0000000000000000000000000000000000000001)"
        );
        roleToken.mint(bob, RoleToken.Role.Developer);
    }

    function test_BurnRemovesRoleAndOwnership() public {
        roleToken.mint(alice, RoleToken.Role.Developer);
        assertTrue(roleToken.hasToken(alice));

        roleToken.burn(0);

        vm.expectRevert(); // token no longer exists
        roleToken.ownerOf(0);

        assertFalse(roleToken.hasToken(alice));
    }

    function test_TransfersAreDisabled() public {
        roleToken.mint(alice, RoleToken.Role.Developer);

        vm.prank(alice);
        vm.expectRevert("Soulbound: Transfers disabled");
        roleToken.transferFrom(alice, bob, 0);
    }

    function test_RoleOf() public {
        roleToken.mint(alice, RoleToken.Role.Developer);

        vm.prank(alice);
        assertEq(roleToken.roleOf(alice), uint(RoleToken.Role.Developer));
    }
}
