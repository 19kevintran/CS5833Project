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

    mapping(address => uint[]) public listedItems;
    mapping(address => uint[]) public purchasedItems;
    Item[] public items;
    uint public nextItemId;

    event ItemListed(uint indexed itemId, address indexed seller, string title, uint price);
    event ItemPurchased(uint indexed itemId, address indexed buyer);
    event Withdrawal(address indexed user, uint amount);
    event BalanceChecked(address indexed user, uint balance);

    function listItem(string memory title, string memory description, uint price) public {
        require(price > 0, "Price must be at least 1 wei");
        uint itemId = nextItemId++;
        items.push(Item(itemId, payable(msg.sender), payable(address(0)), title, description, price, false));
        listedItems[msg.sender].push(itemId);
        emit ItemListed(itemId, msg.sender, title, price);
    }

    function purchaseItem(uint itemId) public payable {
        require(itemId < nextItemId, "Item does not exist");
        Item storage item = items[itemId];
        require(!item.isSold, "Item is already sold");
        require(msg.sender != item.seller, "Seller cannot buy their own item");
        require(msg.value == item.price, "Please submit the asking price in order to complete the purchase");
        item.buyer = payable(msg.sender);
        item.seller.transfer(msg.value);
        item.isSold = true;
        purchasedItems[msg.sender].push(itemId);
        emit ItemPurchased(itemId, msg.sender);
    }

    function checkBalance() public view returns (uint) {
        return msg.sender.balance;
    }

    function getUserListedItems() public view returns (uint[] memory) {
        return listedItems[msg.sender];
    }

    function getUserPurchasedItems() public view returns (uint[] memory) {
        return purchasedItems[msg.sender];
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
    
    function getItemsForSale() public view returns (Item[] memory) {
        uint count = 0;
        for (uint i = 0; i < items.length; i++) {
            if (!items[i].isSold) {
                count++;
            }
        }
        Item[] memory forSale = new Item[](count);
        uint index = 0;
        for (uint j = 0; j < items.length; j++) {
            if (!items[j].isSold) {
                forSale[index] = items[j];
                index++;
            }
        }
        return forSale;
    }
    
    function getItemsSold() public view returns (Item[] memory) {
        uint count = 0;
        for (uint i = 0; i < items.length; i++) {
            if (items[i].isSold) {
                count++;
            }
        }
        Item[] memory soldItems = new Item[](count);
        uint index = 0;
        for (uint j = 0; j < items.length; j++) {
            if (items[j].isSold) {
                soldItems[index] = items[j];
                index++;
            }
        }
        return soldItems;
    }
    
    function getItemInformation(uint itemId) public view returns (Item memory) {
        require(itemId < nextItemId, "Item does not exist");
        return items[itemId];
    }
}
