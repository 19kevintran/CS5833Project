# CS5833Project

This is my final project for CS5833 (Blockchains and Cryptocurrencies). This is a Web3 DApp application that will allow users to list, sell, and buy assets. 

## To access the website

Visit https://19kevintran.github.io/CS5833Project/

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)
- [Metamask](https://metamask.io/download/) (HIGHLY IMPORTANT! Need MetaMask browser extension and wallet)


## Installation

1. Clone the repository:

```
git clone https://github.com/yourusername/CS5833Project.git
cd CS5833Project
```

2. Install the necessary Node.js:

```
npm install
```

3. To start, run:

```
npm start
```

## Smart contract logic: 
- Struct of item: Item includes an id to keep track of the item, an address of the seller, an address of the buyer, item title, item description, item price, and a boolean flag to indicate the availability of the item.

- listItem function: Seller must list title, description, and price of the item. Item id automatically mapped to the id.

- purchaseItem function: Buyer buys an item via item id.

- getaAllItems function: Returns all items and includes both sold and available items information (an address of the seller, an address of the buyer, item title, item description, item price, and a boolean flag to indicate the availability of the item)


## App.js functionality: 
- When the user goes to the website, app.js will first initiate the contract with the contract address and ABI. 

- Upon load, the connectWallet function will look for MetaMask. If the user does not have MetaMask, it will throw an error stating that there is no connection and to install MetaMask. If the user has MetaMask, the connectWallet will wait until a user connects a MetaMask wallet. If the operation is not successful, it will throw an error connecting to the wallet. If successful, the wallet address and balance will appear. If a user chooses to sign in with a new wallet address, the account wallet address will update, call updateBalance function, and display the new wallet balance. In updateBalance, it will call the contract’s getBalance function which will return the balance of the address. 

- When the user successfully signs in with their wallet address, they can list an item or purchase an available item. To list an item, the user will specify the item’s title, description, and value in the parameter fields. The listItem function will take those fields, calculate the gasLimit by multiplying the gasEstimate multiplied by 50%, and calling the contract’s listItem function with the title, description, and price of the item. If the item successfully lists, there will be a message stating that the listing transaction went through. If the item does not successfully list, it will throw an error. Towards the end of the function, it will call the getAllItems which will add the new listing to all listing items and display it via HTML.  

- In getAllItems function, it will call the getAllItems function and retrieve all the items listed for sale. This includes both sold and available items. If the item is available for purchase, the item will have a purchase button. If the item has already been sold, it will not display the purchase item and display that the boolean value for isSold is Yes. 

- If the user chooses to purchase an available item, the purchaseItem function call the items function with the item id to retrieve the item’s price. After retrieving the item price, it will call the purchaseItem function in the contract with the itemId, buyer’s account, and payment value. If the purchase item transaction went through, there will be a success message. Towards the end of the purchaseItem function, it will call getAllItems to update the item’s listing to sold and pdate the buyer’s balance.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.