// contract address
const contractAddress = "0x8871D476e427Bfd4cf6C9cA41f4A3862E96EBAd1";

// contract abi
const abi = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "seller",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "ItemListed",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			}
		],
		"name": "ItemPurchased",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "listItem",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "itemId",
				"type": "uint256"
			}
		],
		"name": "purchaseItem",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "checkBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getAllItems",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "address payable",
						"name": "seller",
						"type": "address"
					},
					{
						"internalType": "address payable",
						"name": "buyer",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "title",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "description",
						"type": "string"
					},
					{
						"internalType": "uint256",
						"name": "price",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "isSold",
						"type": "bool"
					}
				],
				"internalType": "struct Marketplace.Item[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
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
		"name": "items",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "buyer",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "title",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isSold",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listedItems",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nextItemId",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "purchasedItems",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// account 
let account;
// Marketplace.sol contract
let marketplaceContract;
// web3 
let web3;

// Connect to the Sepolia network.
async function connectWallet() {
  if (window.ethereum) {
	// use web3
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
	  // if no account was found
      if (accounts.length === 0) {
        console.error("No account found. Make sure MetaMask is connected.");
        return;
      }
      account = accounts[0];
      document.getElementById("account").textContent = account;
	  // get the account balance
	  updateBalance();
	  // if the wallet account changes
      window.ethereum.on("accountsChanged", function (newAccounts) {
        account = newAccounts[0];
        document.getElementById("account").textContent = account;
        // get the new wallet account balance
		updateBalance();
      });
    } catch (error) {
	  // if there is an error connecting the wallet 
      console.error("Error connecting wallet:", error);
    }
  } else {
	// if MetaMask is not installed
    console.error("Ethereum wallet is not connected. Please install MetaMask.");
  }
}

// list an item 
async function listItem(title, description, priceWei) {
  try {
    // Convert the price to Wei if it's in Ether.
    const priceInWei = web3.utils.toWei(priceWei.toString(), "ether");
    // Estimate gas with a manual increase to avoid out-of-gas errors.
    const gasEstimate = await marketplaceContract.methods
      .listItem(title, description, priceInWei)
      .estimateGas({ from: account });
	//// Increase gas limit by 50% as a buffer.
    const gasLimit = Math.floor(gasEstimate * 1.5); 
    // Send the transaction with the calculated gas limit.
    const tx = await marketplaceContract.methods
      .listItem(title, description, priceInWei)
      .send({ from: account, gas: gasLimit });
	// item listed succcessfully
    console.log("Item listed successfully:", tx);
	// update all listed items
    await getAllItems();
  } catch (error) {
	// error listing the item 
    console.error("Error listing item:", error);
    alert("Error listing item: " + error.message);
  }
}

// update the balance of the account 
async function updateBalance() {
  if (account && web3.utils.isAddress(account)) {
    web3.eth.getBalance(account, (err, balance) => {
      if (err) {
		// error fetching the balance
        console.error("Error fetching balance:", err);
      } else {
		// get and display account balance
        document.getElementById("balance").textContent =
          web3.utils.fromWei(balance, "ether") + " ETH";
      }
    });
  } else {
	// error fetching the balance
    console.error("Invalid Ethereum address.");
  }
}

// display both sold and avaliable items
async function getAllItems() {
  try {
	// all getAllItems from the contract 
    const items = await marketplaceContract.methods.getAllItems().call();
	// display all items in the marketplace from itemList in HTML
    const itemListElement = document.getElementById("itemList");
    itemListElement.innerHTML = "";
    items.forEach((item) => {
      const itemElement = document.createElement("li");
      const priceInEth = web3.utils.fromWei(item.price.toString(), "ether");
	  // display item title, description, price, the address of the seller and buyer, and boolean avaliability status of the item
	  // if item sold, purchase button will not display 
	  // if item avaiable for purcahse, purchase button will display  
      const itemDetails = `
  <div class="item-details">
    <div class="item-title">Title: ${item.title}</div>
    <div class="item-description">Description: ${item.description}</div>
    <div class="item-price">Price: ${priceInEth} ETH</div>
    <div class="item-seller">Seller: ${item.seller}</div>
    <div class="item-buyer">Buyer: ${item.buyer || "N/A"}</div>
    <div class="item-sold">Sold: ${item.isSold ? "Yes" : "No"}</div>
    ${
      !item.isSold
        ? `<button class="purchase-button" onclick="purchaseItem(${item.id})">Purchase</button>`
        : ""
    }
  </div>`;
      itemElement.innerHTML = itemDetails;
      itemListElement.appendChild(itemElement);
    });
  } catch (error) {
	// error fetching items
    console.error("Error fetching all items:", error);
  }
}

// purcahse item function
async function purchaseItem(itemId) {
  try {
	// item by id 
    const item = await marketplaceContract.methods.items(itemId).call();
    const priceInWei = item.price;
    const priceInEth = web3.utils.fromWei(priceInWei, "ether");
    console.log(priceInWei);
    console.log(priceInEth);
	// purchase item function from the contract
    const tx = await marketplaceContract.methods
      .purchaseItem(itemId)
      .send({ from: account, value: priceInWei });
	// item purchased succcessfully
    console.log("Purchase successful:", tx);
	// Refresh the list to reflect the purchase
    await getAllItems(); 
	// update the balance of the account when the contract subtract from the buyer and gives item price to the seller
    updateBalance();
  } catch (error) {
	// error purchasing the item
    console.error("Error purchasing item:", error);
    alert("Error purchasing item: " + error.message);
  }
}

// initiate the contract with contract abi and contract address
async function initContract() {
  marketplaceContract = new web3.eth.Contract(abi, contractAddress);
}

// connect to the wallet, initiate the contract, and display all items
document.addEventListener("DOMContentLoaded", async () => {
  // call connect wallet function
  await connectWallet();
  // initate the contract
  await initContract();
  // display all items
  await getAllItems();
  // list item form from HTML
  const listItemForm = document.getElementById("listItemForm");
  // listen to the submit event of the list item form
  listItemForm.addEventListener("submit", async (event) => {
    event.preventDefault();
	// get the title, description, and price of the item from the list item form
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
	// call listItem function
    await listItem(title, description, price);
  });
});
