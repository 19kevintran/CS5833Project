// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    // Owner of the smart contract
    address payable public owner;

    // Struct for listed items
    struct Item {
        uint id;
        address payable seller;
        string name;
        string description;
        uint price;
        bool sold;
    }

    // State variable to keep track of items count and to generate item IDs
    uint public itemCount;

    // Mapping of item IDs to items
    mapping(uint => Item) public items;

    // Mapping for user balances
    mapping(address => uint) public userBalances;

    // Event for item listed on the marketplace
    event ItemListed(
        uint id,
        address indexed seller,
        string name,
        string description,
        uint price
    );

    // Event for item sold
    event ItemSold(
        uint id,
        address indexed seller,
        address indexed buyer,
        uint price
    );

    // Event for funds deposited
    event FundsDeposited(address indexed user, uint amount);

    // Event for funds withdrawn
    event FundsWithdrawn(address indexed user, uint amount);

    // Constructor sets the owner of the contract
    constructor() {
        owner = payable(msg.sender);
    }

    // Modifier to require the caller to be the owner
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _;
    }

    // Function to list an item for sale
    function listItem(string memory _name, string memory _description, uint _price) public {
        require(_price > 0, "Price must be greater than zero.");
        itemCount++;
        items[itemCount] = Item(itemCount, payable(msg.sender), _name, _description, _price, false);
        emit ItemListed(itemCount, msg.sender, _name, _description, _price);
    }

    // Function to deposit funds into the marketplace
    function depositFunds(uint _amount) public payable {
        require(_amount > 0, "You must deposit at least some ether.");
        // require(msg.value == _amount, "The value sent must match the amount entered.");
        userBalances[msg.sender] += _amount;
        emit FundsDeposited(msg.sender, _amount);
    }
    
    // Function to withdraw funds from the marketplace
    function withdrawFunds(uint _amount) public {
        require(_amount <= userBalances[msg.sender], "Insufficient balance to withdraw.");
        userBalances[msg.sender] -= _amount;
        payable(msg.sender).transfer(_amount);
        emit FundsWithdrawn(msg.sender, _amount);
    }

    // Function to purchase an item
    function purchaseItem(uint _id) public {
        Item storage item = items[_id];
        require(_id > 0 && _id <= itemCount, "Item does not exist.");
        require(userBalances[msg.sender] >= item.price, "Not enough balance to complete the purchase.");
        require(!item.sold, "Item has already been sold.");
        require(msg.sender != item.seller, "Seller cannot buy their own item.");

        userBalances[msg.sender] -= item.price;
        item.seller.transfer(item.price);
        item.sold = true;

        emit ItemSold(_id, item.seller, msg.sender, item.price);
    }

    // Additional functions as needed...
}
