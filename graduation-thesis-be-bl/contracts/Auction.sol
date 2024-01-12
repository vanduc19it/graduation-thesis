// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Auction is IERC721Receiver, Ownable {

    IERC721 private nft;

    uint public constant AUCTION_SERVICE_FEE_RATE = 3;

    uint public constant MINIMUM_BID_RATE = 110; // Percentage

    constructor(IERC721 _nft) {
        nft = _nft;
    }

    function onERC721Received(
        address,
        address,
        uint256,
        bytes calldata
    ) external override pure returns (bytes4) {
        return bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));
    }

    struct AuctionInfo {
        address auctioneer;
        uint256 tokenId;
        uint256 initialPrice;

        address previousBidder;
        uint256 lastBid;
        address lastBidder;

        uint256 startTime;
        uint256 endTime;

        bool completed;
        bool active;
        uint256 auctionId;
    }

    AuctionInfo[] private auctions;

    function createAuction(uint256 _tokenId, uint256 _initialPrice, uint256 _startTime, uint256 _endTime) public {
        require(block.timestamp <= _startTime, "Auction cannot start");
        require(_startTime < _endTime, "Auction cannot end before it starts");
        require(_initialPrice > 0, "Initial price must be greater than 0");

        require(nft.ownerOf(_tokenId) == msg.sender, "Must stake your own token");
        require(nft.getApproved(_tokenId) == address(this), "This contract must be approved to transfer the token");

        nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        AuctionInfo memory _auction = AuctionInfo(
            msg.sender,
            _tokenId,
            _initialPrice,
            address(0),
            _initialPrice,
            address(0),
            _startTime,
            _endTime,
            false,
            true,
            auctions.length
        );

        auctions.push(_auction);
    }

    function joinAuction(uint256 _auctionId) public payable {
        AuctionInfo storage _auction = auctions[_auctionId];

        require(block.timestamp >= _auction.startTime, "Auction has not started");
        require(!_auction.completed, "Auction is already completed");
        require(_auction.active, "Auction is not active");

        uint256 _minBid = _auction.lastBidder == address(0) ? _auction.initialPrice : (_auction.lastBid * MINIMUM_BID_RATE) / 100;
        require(msg.value >= _minBid, "Bid price must be greater than the minimum price");

        require(_auction.auctioneer != msg.sender, "Cannot bid on your own auction");

        if (_auction.lastBidder != address(0)) {
            payable(_auction.lastBidder).transfer(_auction.lastBid);
        }

        _auction.previousBidder = _auction.lastBidder;
        _auction.lastBidder = msg.sender;
        _auction.lastBid = msg.value;
    }

    function finishAuction(uint256 _auctionId) public onlyAuctioneer(_auctionId) {
        AuctionInfo storage _auction = auctions[_auctionId];

        require(!_auction.completed, "Auction is already completed");
        require(_auction.active, "Auction is not active");

        nft.safeTransferFrom(address(this), _auction.lastBidder, _auction.tokenId);

        uint256 lastBid = _auction.lastBid;
        uint256 profit = lastBid - _auction.initialPrice;

        uint256 auctionServiceFee = (profit * AUCTION_SERVICE_FEE_RATE) / 100;
        uint256 auctioneerReceive = lastBid - auctionServiceFee;

        payable(_auction.auctioneer).transfer(auctioneerReceive);

        _auction.completed = true;
        _auction.active = false;
    }

    function cancelAuction(uint256 _auctionId) public onlyAuctioneer(_auctionId) {
        AuctionInfo storage _auction = auctions[_auctionId];

        require(!_auction.completed, "Auction is already completed");
        require(_auction.active, "Auction is not active");

        nft.safeTransferFrom(address(this), _auction.auctioneer, _auction.tokenId);

        if (_auction.lastBidder != address(0)) {
            payable(_auction.lastBidder).transfer(_auction.lastBid);
        }

        _auction.completed = true;
        _auction.active = false;
    }

    function getAuction(uint256 _auctionId) public view returns (AuctionInfo memory) {
        return auctions[_auctionId];
    }

    function getAuctionByStatus(bool _active) public view returns (AuctionInfo[] memory) {
        uint length = 0;
        for (uint i = 0; i < auctions.length; i++) {
            if (auctions[i].active == _active) {
                length ++;
            }
        }

        AuctionInfo[] memory results = new AuctionInfo[](length);
        uint j = 0;
        for (uint256 index = 0; index < auctions.length; index++) {
            if (auctions[index].active == _active) {
                results[j] = auctions[index];
                j++;
            }
        }
        return results;
    }

    modifier onlyAuctioneer(uint256 _auctionId) {
        require((msg.sender == auctions[_auctionId].auctioneer || msg.sender == owner()), "Only auctioneer or owner can perform this action");
        _;
    }
}
