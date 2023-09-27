// scripts/create-box.js
const { upgrades } = require("hardhat");
const { expect } = require("chai");
const { poll } = require("ethers/lib/utils");
const { waffle,ethers } = require("hardhat");
const { userInfo } = require("os");
const provider = waffle.provider;
const web3 = require("web3");


async function main() {
//Deploying Normal Contract
const [signer] = await ethers.getSigners();
const Greeter = await ethers.getContractFactory("Greeter");
const greeter = await Greeter.deploy("Hello World");
await greeter.deployed();
//get the signer address
const signerAddress = await signer.getAddress();
console.log("signer address(sender): ",signerAddress)
const signerBalance = await provider.getBalance(signerAddress); 
console.log("Signer Balance: ",signerBalance.toString())
  const tx = await signer.sendTransaction({to:'0xA6597Afd9FE6c91cd096E95A9d9EDDB38E5Eb843', value:ethers.utils.parseEther("10") }) 
  const balance =  await provider.getBalance("0xA6597Afd9FE6c91cd096E95A9d9EDDB38E5Eb843")
await tx.wait();

 console.log("MetaMask balance(hardhat): ",balance.toString())
  
  console.log("Greeter Contract Address", greeter.address);

  const Deploy = await ethers.getContractFactory("myContract");
  const deploy = await Deploy.deploy();
  
  console.log("My Contract address: ", deploy.address);
//Deploying Upgradable Contract  
  // const Greeter = await ethers.getContractFactory("GreeterUpgrade");
  // const greeter = await upgrades.deployProxy(Greeter,["Hello World"],{initializer: 'initialize'});
  // await greeter.deployed();
  // console.log("Greeter Upgradable Contract Address", greeter.address);

//Upgrading Upgradable Contract  
  // const proxyAddress = '0x9539f8A71e8129623050ee117a92Efa6c5a23e5b';  
  // const Greeter = await ethers.getContractFactory("GreeterUpgrade");
  // const GreeterAddress = await upgrades.prepareUpgrade (proxyAddress,Greeter);
  // console.log("Greeter upgrade address :",GreeterAddress);
  
}

main();
