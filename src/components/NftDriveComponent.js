import { ethers } from "ethers"
import { NFTStorage, File, Blob } from 'nft.storage'
import {useState} from 'react';
//bootstrap
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles.css'

//<Container>
//      <Row>
//		< Col sm={12} md={12} lg={12} xl={12}>

//				<Button variant="primary">Primary</Button>{' '}

//      </Col>
//      </Row>
//</Container>
//bootstrap

//**********************************CONTRACT CONNECT***********************************
const NFT_STORAGE_TOKEN = process.env.REACT_APP_STORAGE
const client = new NFTStorage({ token: NFT_STORAGE_TOKEN })

let provider = new ethers.providers.Web3Provider(window.ethereum)
let signer

var cid = 0 // storage

export function Connectmetamask() {
	
	
	return (<div className="MetamaskBtn">
	
	<Button variant="primary"
	onClick={async ()=>{   // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    signer = await provider.getSigner();
	var cuenta = await signer.getAddress();
	document.getElementById("demo").innerHTML= "User: " + cuenta;
    console.log("Account address:", await signer.getAddress());}}
	
	
	>Connect Metamask</Button>{' '}
	<br />
	
	
	<p id="demo">User:</p>
	
	
	
	
	</div>
	
	)
} 
{/*  
	     0xa3EbfE65CA40144fCc5e395C5cecceDDbE4d2d15      */}
		 
		 var address =0

export function ContractInput(){
	return (<div className="MetamaskBtn">
	<p>Contract: <input id="add2" onChange={function(e){
		 address = e.target.value
		console.log(address)}}/></p>
	</div>)
	
}
	 
{/*const address = "0xBEFcA8Cd9EAe06C0b6Da44CF0b877fc7813e0915"  */}
const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "removeData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "saveData",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "data",
				"type": "string"
			}
		],
		"name": "upData",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arr",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "dataStorage",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getdata",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];



var textNameDescription = " ";
export function InputNameDescrip(){
	return(<>
	
	<p>Name/Description:</p>
	<p> <input id="furl" className="inputScript" onChange={function(e){
		textNameDescription = e.target.value
		
		console.log(textNameDescription)}}/></p>
		
	</>)
}

var myFile= [];
export function ChooseFile(){
	
	
	
	return(<>
	
			<h5>Upload file </h5>
			{/*<input id="fileItem" type="file" className="MyInputFile" name="My File"/>*/}
			<p><input id="fileItem" type="file" className="MyInputFile" name="My File" onChange={function(){
		const file = document.getElementById('fileItem').files[0];
		myFile.push(file);}}/></p>
			
						
	
	</>)
}


export function WriteContract()

{return(<div>

	{/*Formulario y botón
	<p>Name/Description:</p>
	<p> <input id="furl" className="inputScript" onChange={function(e){
		textNameDescription = e.target.value
		
		console.log(textNameDescription)}}/></p>
*/}


<Button variant="primary"
onClick={async ()=>{
	
	const storingx = new ethers.Contract(address, abi, signer);
	{/*var x = cid
	var x = document.getElementById('furl').value;*/} 

cid = await client.storeDirectory([
	new File([myFile[0]], myFile[0].name),
	new File([JSON.stringify({'from': 'incognito'}, null, 2)], 'metadata.json')
])
	
	console.log(cid)


	const d = new Date()
	
	var z = "Description: " + textNameDescription + ", " + "File IPFS : " + "https://ipfs.io/ipfs/"+ cid+"/"+myFile[0].name + " Date: " +d;
	console.log(z)
	
	await storingx.upData(z);
	await storingx.saveData();
    
    document.getElementById('furl').value = " ";
	myFile.shift();
}}




>Save</Button>{' '}



</div>)}



export function ReadContract(){
	 
	
	 
	return (<div className="MetamaskBtn">
	<h5>Read Contract</h5>
	<Button variant="primary"
	onClick={async ()=>{
	const contracto = new ethers.Contract(address, abi, provider);
	
	const myArray = await contracto.getdata();
	console.log(myArray);
	console.log(myArray.length);
	
	let text= "";
	for(let i=0; i<(myArray.length); i++){
		text += "id: " + i + ", " + myArray[i] + "<br>";
	}
	
	document.getElementById("demos").innerHTML = text;
	
	}}
	
	
	
	
	>Read Contract</Button>{' '}
	
	 <p id="demos"></p>
		    </div>)
	
	
}









export function TesterFactor(){
	return(<>

	<Button variant="primary"
	onClick={async ()=>{
		
		
	
	
	
	const metadata = await client.store({
  name: 'nft.storage store test',
  description: 'Test ERC-1155 compatible metadata.',
  image: new File([myFile[0]], myFile[0].name, { type: myFile[0].type }),
  properties: {
    custom: 'Custom data can appear here, files are auto uploaded.',
    file: new File(['<DATA>'], 'README.md', { type: 'text/plain' }),
  }
})

console.log('IPFS URL for the metadata:', metadata.url)
console.log('metadata.json contents:\n', metadata.data)


console.log('metadata.json with IPFS gateway URLs:\n', metadata.embed())

	
		
	}}
	>NFT Storage</Button>


	
	</>)
}

{/*
export function StoreFile(){
	return(<>
	
	<Button variant='primary'
	onClick={async ()=>{
		
	 cid = await client.storeDirectory([
	new File([myFile[0]], myFile[0].name),
	new File([JSON.stringify({'from': 'incognito'}, null, 2)], 'metadata.json')
])
	
	console.log(cid)
	}}
	>Store file in IPFS</Button>
	</>)
}
*/}




//**********************************STORAGE***********************************

export function TituloPaginaNftDrive(){
	return(<>
	
	<h2>NFT Drive</h2>
	
	</>)
}



var iddeleteData = " ";
export function InputdeleteDataContract(){
	return(<div className="deletedataInput">
	
	<h4>Remove data by id</h4>
	<p>Id to Remove: <input className="deletedata" id="dataBorrar"  onChange={function(e){
		iddeleteData = e.target.value
		
		console.log(iddeleteData)}}/></p>
		
	</div>)
}

export function DeleteIdButtonContract(){
	return(<div className="deletedata">
	
	
	<Button  variant="primary"
	onClick={async ()=>{
		const storingx = new ethers.Contract(address, abi, signer);
		var dataWantedtoDelete = document.getElementById('dataBorrar').value
		await storingx.removeData(dataWantedtoDelete);
	}}
	>Remove Id</Button>
	
	
	
	
	</div>)
}