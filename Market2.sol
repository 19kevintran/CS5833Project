// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Item {
        uint id;
        address payable seller;
        address payable buyer;
        string title;
        string description;
        uint price;
        bool isSold;
    }

    struct Account {
        bool isLoggedIn;
        uint balance;
        uint[] listedItems;
        uint[] purchasedItems;
    }

    mapping(address => Account) public accounts;
    Item[] public items;
    uint public nextItemId;

    event UserLoggedIn(address indexed user, uint balance);
    event UserLoggedOut(address indexed user, uint balance);
    event ItemListed(uint indexed itemId, address indexed seller, string title, uint price);
    event ItemPurchased(uint indexed itemId, address indexed buyer);
    event Withdrawal(address indexed user, uint amount);
    event BalanceChecked(address indexed user, uint balance);

    modifier onlyLoggedIn() {
        require(accounts[msg.sender].isLoggedIn, "User must be logged in");
        _;
    }

    function login() public {
        require(!accounts[msg.sender].isLoggedIn, "User is already logged in");
        accounts[msg.sender].isLoggedIn = true;
        if (accounts[msg.sender].balance == 0) {
            accounts[msg.sender].balance = msg.sender.balance;
        }
        emit UserLoggedIn(msg.sender, accounts[msg.sender].balance);
    }

    function logout() public {
        require(accounts[msg.sender].isLoggedIn, "User is not logged in");
        emit UserLoggedOut(msg.sender, accounts[msg.sender].balance);
        delete accounts[msg.sender];
    }

    function listItem(string memory title, string memory description, uint price) public onlyLoggedIn {
        require(price > 0, "Price must be at least 1 wei");
        uint itemId = nextItemId++;
        items.push(Item(itemId, payable(msg.sender), payable(address(0)), title, description, price, false));
        accounts[msg.sender].listedItems.push(itemId);
        emit ItemListed(itemId, msg.sender, title, price);
        
        // Update seller's balance
        accounts[msg.sender].balance += price;
    }

    function purchaseItem(uint itemId) public payable onlyLoggedIn {
        require(itemId < nextItemId, "Item does not exist");
        Item storage item = items[itemId];
        require(!item.isSold, "Item is already sold");
        require(msg.value == item.price, "Please submit the asking price in order to complete the purchase");
        item.buyer = payable(msg.sender);
        item.seller.transfer(msg.value);
        item.isSold = true;

        // Update buyer's balance
        accounts[msg.sender].balance += msg.value;
        
        // Update purchased items list
        accounts[msg.sender].purchasedItems.push(itemId);

        emit ItemPurchased(itemId, msg.sender);
    }


    function checkBalance() public view returns (uint) {
        require(accounts[msg.sender].isLoggedIn, "User must be logged in");
        return accounts[msg.sender].balance;
    }

    function getUserListedItems() public view onlyLoggedIn returns (uint[] memory) {
        return accounts[msg.sender].listedItems;
    }

    function getUserPurchasedItems() public view onlyLoggedIn returns (uint[] memory) {
        return accounts[msg.sender].purchasedItems;
    }

    function getAllItems() public view returns (Item[] memory) {
        return items;
    }

    function getItemSeller(uint itemId) public view returns (address) {
        require(itemId < nextItemId, "Item does not exist");
        return items[itemId].seller;
    }

    function getItemBuyer(uint itemId) public view returns (address) {
        require(itemId < nextItemId, "Item does not exist");
        return items[itemId].buyer;
    }
}




