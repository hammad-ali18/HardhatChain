// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyERC20 is ERC20 {

    mapping(address => uint256) public balances;

    constructor(string memory _name, string memory _symbol) ERC20(_name, _symbol) {
        _mint(msg.sender, 20000000000 ); 
    }
    
// function tokenBalance() external returns(uint256){
// return balanceOf(msg.sender);
// }
//     function transferTokens(address to, uint256 amount) external returns (bool) {
//         require(to != address(0), "Invalid address");
//         require(balances[msg.sender] >= amount, "Insufficient balance");

//         // Use transferFrom to perform the token transfer
//         transferFrom(msg.sender, to, amount);

    
//         balances[msg.sender] -= amount;
//         balances[to] += amount;

//         return true; 
//     }
}
