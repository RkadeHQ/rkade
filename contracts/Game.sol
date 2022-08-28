// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Game {
    address payable public owner;

    address[] public players;
    mapping (address => bool) public playersMapping;

    constructor() {
        owner = payable(msg.sender);
    }

    receive() external payable {
        require(!playersMapping[msg.sender], "Player already entered");
        players.push(msg.sender);
        playersMapping[msg.sender] = true;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    function contains() public view returns (bool){
        return playersMapping[msg.sender];
    }

    function getBalance() external view returns (uint) {
        return address(this).balance;
    }

    function distributeWinnings(address[5] memory topFivePlayers) public {
        uint halfBalance = address(this).balance / 2;
        uint playerWinnings = halfBalance / 5;

        owner.transfer(halfBalance);
        payable(topFivePlayers[0]).transfer(playerWinnings);
        payable(topFivePlayers[1]).transfer(playerWinnings);
        payable(topFivePlayers[2]).transfer(playerWinnings);
        payable(topFivePlayers[3]).transfer(playerWinnings);
        payable(topFivePlayers[4]).transfer(playerWinnings);
    }
}