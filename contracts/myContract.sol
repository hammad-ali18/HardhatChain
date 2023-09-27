pragma solidity >=0.8.4;
import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract myContract is Ownable{
 event Mint(address indexed tokenAddressto,string symbol, uint256 amount);
mapping (string=>uint256) public balances;


function MintTokens(string calldata symbol1,string  calldata symbol2) external onlyOwner(){

    mint(address(msg.sender),symbol1,10000000000000);
    mint(address(msg.sender),symbol2,10000000000000);
    console.log(balances[symbol1], balances[symbol2]);
console.log("Successfully minted");

}
function mint(address tokenAddress, string calldata symbol, uint256 amount) internal onlyOwner(){
require(msg.value >=0,'Insufficent Balance of Eth');
balances[symbol]+=amount;
emit Mint(address(msg.sender),symbol,amount);

}

}
