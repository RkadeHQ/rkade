// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';

contract NFT is ERC721URIStorage {
    mapping(address => uint256[]) private itemIdToTokenItem;

    constructor(string[104] memory tokenURIs) ERC721("Rkade Football NFTs", "RKADE") {
        for (uint i = 1; i <= 104; i++) {
            _mint(address(this), i);
            _setTokenURI(i, tokenURIs[i-1]);
            itemIdToTokenItem[msg.sender].push(i);
        }
    }

  function fetchNFTs() public view returns (uint256[] memory) {
    return itemIdToTokenItem[msg.sender];
  }

  function transferNFT(uint256 tokenId) public {
      transferFrom(address(this), msg.sender, tokenId);
  }
}