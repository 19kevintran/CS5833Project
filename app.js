document.addEventListener("DOMContentLoaded", function () {
    // Connect to the marketplace contract
    const contractAddress = "0x57dcE26e3dF06b080855C35b5622a4f3e9971a98"; // Replace with your contract address
    const contractABI = [
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "name": "BalanceChecked",
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
            "inputs": [],
            "name": "login",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "logout",
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
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "name": "UserLoggedIn",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "name": "UserLoggedOut",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "user",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "Withdrawal",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "accounts",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "isLoggedIn",
                    "type": "bool"
                },
                {
                    "internalType": "uint256",
                    "name": "balance",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
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
                    "name": "itemId",
                    "type": "uint256"
                }
            ],
            "name": "getItemBuyer",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
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
            "name": "getItemSeller",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUserListedItems",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getUserPurchasedItems",
            "outputs": [
                {
                    "internalType": "uint256[]",
                    "name": "",
                    "type": "uint256[]"
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
        }
    ];

    let web3;
    let marketplaceContract;
    let userAccount;

    async function init() {
        // Check if Web3 is injected by the browser (MetaMask)
        if (typeof window.ethereum !== "undefined") {
            web3 = new Web3(window.ethereum);
            try {
                // Request account access if needed
                await window.ethereum.request({ method: "eth_requestAccounts" });
                // Accounts now exposed
                userAccount = await web3.eth.getAccounts();
                marketplaceContract = new web3.eth.Contract(contractABI, contractAddress);
            } catch (error) {
                console.error("User denied account access:", error);
            }
        } else {
            console.error("Please install MetaMask to use this application");
        }
    }

    // Login function
    async function login() {
        if (userAccount.length === 0) {
            console.error("No account found");
            return;
        }
        await marketplaceContract.methods.login().send({ from: userAccount[0] });
        console.log("Logged in successfully");
    }

    // Logout function
    async function logout() {
        if (userAccount.length === 0) {
            console.error("No account found");
            return;
        }
        await marketplaceContract.methods.logout().send({ from: userAccount[0] });
        console.log("Logged out successfully");
    }

    // List item function
    async function listItem(title, description, price) {
        if (userAccount.length === 0) {
            console.error("No account found");
            return;
        }
        const weiPrice = web3.utils.toWei(price.toString(), 'ether');
        await marketplaceContract.methods.listItem(title, description, weiPrice).send({ from: userAccount[0] });
        console.log("Item listed successfully");
    }

    // Purchase item function
    async function purchaseItem(itemId) {
        if (userAccount.length === 0) {
            console.error("No account found");
            return;
        }
        await marketplaceContract.methods.purchaseItem(itemId).send({ from: userAccount[0] });
        console.log("Item purchased successfully");
    }

    // Check balance function
    async function checkBalance() {
        if (userAccount.length === 0) {
            console.error("No account found");
            return;
        }
        const balance = await marketplaceContract.methods.checkBalance().call({ from: userAccount[0] });
        document.getElementById("userBalance").innerText = `${web3.utils.fromWei(balance)} ether`;
        console.log("Balance:", balance);
    }

    // Bind login button
    document.getElementById("loginBtn").addEventListener("click", login);

    // Bind logout button
    document.getElementById("logoutBtn").addEventListener("click", logout);

    // Bind list item button
    document.getElementById("listItemBtn").addEventListener("click", function () {
        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const price = document.getElementById("price").value;
        listItem(title, description, price);
    });

    // Bind purchase item button
    document.getElementById("purchaseItemBtn").addEventListener("click", function () {
        const itemId = document.getElementById("itemId").value;
        purchaseItem(itemId);
    });

    // Bind check balance button
    document.getElementById("checkBalanceBtn").addEventListener("click", checkBalance);
    
    // Initialize
    init();
});
