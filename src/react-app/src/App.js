import { ChainId, ConnectWallet } from "@thirdweb-dev/react";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json"
import ERC20 from "./artifacts/contracts/MyERC20.sol/MyERC20.json"
import { Web3Button } from "@thirdweb-dev/react";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import "./globals.css"
import { useState } from "react";

export default function Home() {

//request the access of the user's metamask account
async function requestAccount(){
  await window.ethereum.request(
    {
    method:'eth_requestAccounts'
    }
 )
}
// const contractaddress = "0xDC57724Ea354ec925BaFfCA0cCf8A1248a8E5CF1"
// //fetches the current value store in greeting
// async function fetchGreeting(){
//   //if meta mask exists
//   if(typeof window.ethereum !== 'undefined'){

//     const provider = new ethers.providers.Web3Provider(window.ethereum);
    
//     //creating the instance for the contract
//     const contract = new ethers.Contract(contractaddress,Greeter.abi,provider)
    

//   try{
// let getcode = await provider.getCode(contractaddress);
// console.log(getcode) 
//     const data = await contract.greet();
//     console.log("data: ",data)
//     setCurrentGreeting(data);
//     setTimeout(()=>{
//       setCurrentGreeting("")
//     },10000);
// }catch(error){
//   console.log("there's an error",error)
// }

//   }

//   }

//   const [message, setMessage] = useState("")
//   const [currentGreeting, setCurrentGreeting] = useState("");

  // const [transactionStatus, setTransactionStatus] = useState("")
//   async function sendEth(toAddress,amount){
// console.log(typeof toAddress)
// //request to access metamask account
// try{

//   if( typeof window.ethereum !=='undefined'){
//     await requestAccount();
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const signer = provider.getSigner();
//     const sendeth = await signer.sendTransaction(
//       {
//         to:toAddress,
//         value:ethers.utils.parseEther(`${amount}`)
//       }
//       )
//       const statusmsg =  `${amount} has been sent to ${toAddress}`
//       setAddress("")
//       setAmount("")
//       await sendeth.wait();
//       setTransactionStatus(statusmsg);
//     }
//   }catch(error){
//   const errormsg = `Error in sending ${amount} due to ${error.message}`
//   setTransactionStatus(errormsg)
//     }

// }


// ADD A NETWORK
const EthereumNetworks = [
  //  {
    //   chainId: '0x420', // Optimism Mainnet
    
    //   chainName: 'Optimism Network',
    //   rpcUrl: ['https://mainnet.optimism.io'],
    //   nativeCurrency: {
      //     name: "Optimism",
      //     symbol: "OPTM",
      //     decimals: 18
      //   },
      
      //  },
      //  {
        //   chainId: '0xa4b1',
        //   chainName: 'Arbitrum Network',
        //   rpcUrl: ['https://arb1.arbitrum.io/rpc'],
        //   nativeCurrency: {
//     name: "Arbitrum",
//     symbol: "ABTM",
//     decimals: 18
//   },


// },
//JSON CHAINID AND JSON RPC FOR BOTH HARDHATlOCAL AND HARDHATFORKED WILL BE SAME
{
  chainId:'0x7a69',//hex code Hardhat Mainnet
  chainName:'Hardhat Network',
  rpcUrl: ['http://127.0.0.1:8545/'], 
  nativeCurrency: {
    name: "HARDHAT",
    symbol: "HHT",
          decimals: 18
        },
},
{
  chainId: '0x7a69', // Custom Chain ID for local Hardhat
  chainName: 'Hardhat Local', // Provide a suitable name
  rpcUrl: ['http://127.0.0.1:8545/'], // Use the JSON-RPC URL of your local Hardhat network
  nativeCurrency: {
    name: "HARDHATLOCAL", // Use "ETH" as the native currency name
    symbol: "HHL", // Use "ETH" as the native currency symbol
    decimals: 18, // Use 18 decimals for ETH
  },
}
]
//handling hardhat on mainnet or locally
const [selectedNetwork, setSelectedNetWork] = useState(EthereumNetworks[0]);

const handleNetworkChange = (events)=>{
  console.log(events)
  setSelectedNetWork(EthereumNetworks[events])

}

const [networkStatus, setNetWorkStatus] = useState("")
async function AddNetWork(){
await requestAccount();
  try{

  await  window.ethereum.request({
      method:'wallet_switchEthereumChain',
      params:[
        {
        chainId: selectedNetwork.chainId,//hex code of hardhat
        
      }
    
    ],
  })
let networkStatus = `${selectedNetwork.chainName} already exists Switching to ${selectedNetwork.chainName}..`
  setNetWorkStatus(networkStatus)
  setTimeout(()=>{
    setNetWorkStatus("")
  },2000)
  }catch(SwithError){
    let networkStatus = `adding ${selectedNetwork.chainName}...`
    setNetWorkStatus(networkStatus);

    if(SwithError.code ===4902){
      try{
        await window.ethereum.request({
          method:'wallet_addEthereumChain',
          params:[
            {
              chainId:selectedNetwork.chainId,
              chainName:selectedNetwork.chainName,
              rpcUrls:selectedNetwork.rpcUrl,
            nativeCurrency: selectedNetwork.nativeCurrency
            },
          ],
          
        })
  
        setNetWorkStatus(`${selectedNetwork.chainName} added Successfully`)

        setTimeout(()=>{
          setNetWorkStatus("")
        },3000)

      }catch(addError){
   
        console.log(`ERRor in adding ${selectedNetwork.chainName}`)
      }
    }
  }
}

//  async function setGreeting(){
// if(!message)return;
// //if metamask exists
// if(typeof window.ethereum !== 'undefined'){
//   await requestAccount();

//   const provider = new ethers.providers.Web3Provider(window.ethereum)

//   const signer = provider.getSigner();
//   //create contract with signer
//   const contract = new ethers.Contract(contractaddress,Greeter.abi,signer)
//   const transaction = await contract.setGreeting(message)
//   setMessage("")
//   await transaction.wait();
//   fetchGreeting()
// }

// }
  // const [address, setAddress] = useState("");
  // const [amount, setAmount] = useState("");

//   const [ERC20Address, setERC20Address] = useState("")

// const [balance,setBalance] = useState("")
// const [walletAddress,setWalletAddress] = useState("")
//  async function fetchBalance(){
// if(typeof window.ethereum !== 'undefined'){
//   const provider =  new ethers.providers.Web3Provider(window.ethereum);
//   const tetherAddress =  "0xdAC17F958D2ee523a2206206994597C13D831ec7"
//   const contract = new ethers.Contract(tetherAddress,ERC20.abi,provider)

// //   const signer  = provider.getSigner();
// //  const walletAddress = signer.getAddress();
// //   setWalletAddress(walletAddress);

//   try{
//     let getCode = await provider.getCode(tetherAddress);
// console.log(getCode)

// const data = await contract.balanceOf(ERC20Address.toString());
// console.log(data.toString())

// //settingbalance to display on balance(s) useState()
// setBalance(data.toString())

// //clear the balance
// setTimeout(()=>{
// setBalance("")
// },4000)

//   }catch(error){
// console.log("Error in fetching address details")
//   }
// }
// }

  return (

    <>
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
<div className="">

   
{/* <div className="flex flex-col gap-y-4 items-center">

  
      <input  className="w-[400px] text-center"
      onChange={(e)=>setMessage(e.target.value)}
      value={message}
      placeholder="Enter a text here"></input>
      <div className="flex gap-x-6">

    <button
     className="w-full px-2 rounded-md shadow-4xl bg-cyan-500 text-gray-700  font-bold"
     onClick={fetchGreeting}
     >Fetch Greeting</button>
    <button className="w-full px-2 rounded-md shadow-4xl bg-cyan-500 text-gray-700 font-bold" 
    onClick={setGreeting}>Set Greeting</button>
    </div>
    
<h2 className="text-3xl font-bold">{currentGreeting}</h2>
</div> */}
<div className="my-12">

<div className="flex flex-col justify-center items-center gap-y-6 my-6 ">


    {/* <button className="px-4 py-4 rounded-md shadow-4xl bg-red-700 text-gray-900  font-bold" onClick={()=>AddNetWork(EthereumNetworks[0])}>Add Optimism</button>
    <br/>
    <button  className="px-4 py-4 rounded-md shadow-4xl bg-red-700 text-gray-900  font-bold" onClick={()=>AddNetWork(EthereumNetworks[1])}>Add Arbitrum </button> */}
<br/>

{/* option to select network */}
<select onChange={(e)=>handleNetworkChange(e.target.value)}>

{
  EthereumNetworks.map((network,index)=>(
    <option key={index} value={index}
    >{network.chainName}</option>
    ))
}
</select>
    <button className="px-4 py-4 rounded-md shadow-4xl bg-red-700 text-gray-900  font-bold" onClick={AddNetWork}>Add Hardhat</button>
<h2>{networkStatus}</h2>
<br/>
</div>
<p> "Default buttons for adding network on meta mask by adding all its configuration details"
</p>
</div>


 {/* fetching balance of token */}
{/* <input className="w-[400px] text-center"
onChange={(e)=> setERC20Address(e.target.value)}
value={ERC20Address}
placeholder="Enter token Address to fetch the Balance"
></input>
<button onClick={fetchBalance}>Fetch Token Balance</button>
<h2>{balance}</h2> */}

    <br/>
{/* <input onChange={(e)=> setAddress(e.target.value) }
 placeholder="enter a valid address"
 value={address}/>
<br/>
 <input onChange={(e)=> setAmount(e.target.value)}
 placeholder="Enter the token amount to send"
 value={amount}/>

    <button onClick={()=>sendEth(address,amount)}>Send hardhat tokens to another account</button>
    {transactionStatus && <h2>{transactionStatus}</h2>} */}

    <br/>
      {/* </ThirdwebProvider> */}
 </div>

    </div>
    </>
  );
  }
  