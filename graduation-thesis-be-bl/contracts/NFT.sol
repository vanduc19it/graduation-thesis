// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFT is ERC721URIStorage {
    uint public tokenCount;

    // Mapping để lưu trữ thông tin của từng NFT đã được tạo bởi mỗi chủ sở hữu
    mapping(address => uint[]) private nftsByOwner;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(string memory _tokenURI) external returns (uint) {
        tokenCount++;
        _safeMint(msg.sender, tokenCount);
        _setTokenURI(tokenCount, _tokenURI);

        // Lưu thông tin của NFT đã tạo bởi chủ sở hữu
        nftsByOwner[msg.sender].push(tokenCount);

        return tokenCount;
    }

    // Hàm để lấy danh sách các NFT đã tạo bởi một chủ sở hữu
   function getNFTsByOwner(address owner) external view returns (uint[] memory) {
        uint[] memory ownedTokens = nftsByOwner[owner];
        uint nftItemCount = 0;
        for (uint i = 0; i < ownedTokens.length; i++) {
            if (ownerOf(ownedTokens[i]) == owner) {
                nftItemCount++;
            }
        }
        uint[] memory result = new uint[](nftItemCount);
        uint index = 0;
        for (uint i = 0; i < ownedTokens.length; i++) {
            if (ownerOf(ownedTokens[i]) == owner) {
                result[index] = ownedTokens[i];
                index++;
            }
        }
        return result;
    }

}
