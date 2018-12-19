pragma solidity ^0.4.23;

//Simple event selling tickets
contract SimpleEvent {
    //Owner of this contract
    address public owner;
    //Number of tickets available
    uint private tickets;
    //Price of tickets
    uint private price;


    //Create a new Event
    constructor(uint _tickets, uint _price) public payable {
        require (_tickets > 0, "Number of ticket greater than 0");
        owner = msg.sender;
        tickets = _tickets;
        price = _price;
    }

    //Set the price of a ticket in ether
    function setPrice(uint _newPrice) public returns (uint) {
        require(msg.sender == owner, "Only the owner of this event can alter the price of tickets");
        price = _newPrice;
        return price;
    }

    //Return price of a ticket in ether
    function getPrice() public view returns(uint) {
        return price;
    }

    //Get the number of tickets remaining
    function ticketsRemaining() public view returns(uint) {
        return tickets;
    }
}