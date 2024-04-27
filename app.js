const contractAddress = "0x5a3A053d2D3df7BBeC8883736F1691228fAb7861";
const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
    ],
    name: "BalanceChecked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "ItemListed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
    ],
    name: "ItemPurchased",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "listItem",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
    ],
    name: "purchaseItem",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "Withdrawal",
    type: "event",
  },
  {
    inputs: [],
    name: "checkBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllItems",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isSold",
            type: "bool",
          },
        ],
        internalType: "struct Marketplace.Item[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
    ],
    name: "getItemBuyer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
    ],
    name: "getItemInformation",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isSold",
            type: "bool",
          },
        ],
        internalType: "struct Marketplace.Item",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "itemId",
        type: "uint256",
      },
    ],
    name: "getItemSeller",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getItemsForSale",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isSold",
            type: "bool",
          },
        ],
        internalType: "struct Marketplace.Item[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getItemsSold",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address payable",
            name: "seller",
            type: "address",
          },
          {
            internalType: "address payable",
            name: "buyer",
            type: "address",
          },
          {
            internalType: "string",
            name: "title",
            type: "string",
          },
          {
            internalType: "string",
            name: "description",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isSold",
            type: "bool",
          },
        ],
        internalType: "struct Marketplace.Item[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserListedItems",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUserPurchasedItems",
    outputs: [
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "items",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address payable",
        name: "seller",
        type: "address",
      },
      {
        internalType: "address payable",
        name: "buyer",
        type: "address",
      },
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isSold",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "listedItems",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "nextItemId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "purchasedItems",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
let account;
let marketplaceContract;
let web3;

async function connectWallet() {
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length === 0) {
        console.error("No account found. Make sure MetaMask is connected.");
        return;
      }
      account = accounts[0];
      document.getElementById("account").textContent = account;
      updateBalance();
      window.ethereum.on("accountsChanged", function (newAccounts) {
        account = newAccounts[0];
        document.getElementById("account").textContent = account;
        updateBalance();
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  } else {
    console.error("Ethereum wallet is not connected. Please install MetaMask.");
  }
}

async function listItem(title, description, priceWei) {
  try {
    // Convert the price to Wei if it's in Ether.
    const priceInWei = web3.utils.toWei(priceWei, "ether");
    // Estimate gas with a manual increase to avoid out-of-gas errors.
    const gasEstimate = await marketplaceContract.methods
      .listItem(title, description, priceInWei)
      .estimateGas({ from: account });
    const gasLimit = gasEstimate * 1.5; // Increase gas limit by 50% as a buffer.
    // Send the transaction with the calculated gas limit.
    const tx = await marketplaceContract.methods
      .listItem(title, description, priceInWei)
      .send({ from: account, gas: gasLimit });
    console.log("Item listed successfully:", tx);
    await getAllItems();
  } catch (error) {
    console.error("Error listing item:", error);
    alert("Error listing item: " + error.message);
  }
}

async function updateBalance() {
  if (account && web3.utils.isAddress(account)) {
    web3.eth.getBalance(account, (err, balance) => {
      if (err) {
        console.error("Error fetching balance:", err);
      } else {
        document.getElementById("balance").textContent =
          web3.utils.fromWei(balance, "ether") + " ETH";
      }
    });
  } else {
    console.error("Invalid Ethereum address.");
  }
}

async function getAllItems() {
  try {
    const items = await marketplaceContract.methods.getAllItems().call();
    const itemListElement = document.getElementById("itemList");
    itemListElement.innerHTML = "";
    items.forEach((item) => {
      const itemElement = document.createElement("li");
      const priceInEth = web3.utils.fromWei(item.price.toString(), "ether");
      const itemDetails = `
  <div class="item-details">
    <div class="item-ID">ID: ${item.id}</div>
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
    console.error("Error fetching all items:", error);
  }
}

async function purchaseItem(itemId) {
  try {
    const item = await marketplaceContract.methods.items(itemId).call();
    const priceInWei = item.price;
    const priceInEth = web3.utils.fromWei(priceInWei, "ether");

    const tx = await marketplaceContract.methods
      .purchaseItem(itemId)
      .send({ from: account, value: priceInEth });
    console.log("Purchase successful:", tx);
    await getAllItems(); // Refresh the list to reflect the purchase
  } catch (error) {
    console.error("Error purchasing item:", error);
    alert("Error purchasing item: " + error.message);
  }
}

async function initContract() {
  marketplaceContract = new web3.eth.Contract(abi, contractAddress);
}

document.addEventListener("DOMContentLoaded", async () => {
  await connectWallet();
  await initContract();
  await getAllItems();

  const listItemForm = document.getElementById("listItemForm");
  listItemForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const price = document.getElementById("price").value;
    await listItem(title, description, price);
  });
});
