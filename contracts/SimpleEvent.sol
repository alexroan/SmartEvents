pragma solidity ^0.4.23;

//Simple event selling tickets
contract SimpleEvent {
    //Owner of this contract
    address public owner;
    //Number of tickets available
    uint private tickets;
    //Price of tickets
    uint private price;
    //Tickets held
    mapping(address => uint) ticketHolders;
    //Balances for each account
    mapping(address => uint) balances;

    //Log on the blockchain that tickets have been bought
    event LogTicketsBought(address indexed accountAddress, uint tickets, uint price);

    //Create a new Event
    constructor(uint _tickets, uint _price) public payable {
        require (_tickets > 0, "Number of ticket greater than 0");
        owner = msg.sender;
        tickets = _tickets;
        price = _price;
    }

    //Buy tickets for the event
    //TODO Test
    function buyTickets(uint _tickets) public payable returns(uint) {
        require(tickets > 0, "No tickets available");
        require(tickets >= _tickets, "Not enough tickets available");
        require(msg.value >= _tickets * price, "Not enough ether sent to buy that many tickets");
        tickets -= _tickets;
        ticketHolders[msg.sender] = _tickets;
        balances[msg.sender] += msg.value;
    }

    //Return price of a ticket in ether
    function getPrice() public view returns(uint) {
        return price;
    }

    //Get the number of tickets remaining
    function ticketsRemaining() public view returns(uint) {
        return tickets;
    }

    //Only owner modifier
    modifier onlyOwner(){
        require(msg.sender == owner, "Only the owner can do this.");
        _;
    }

    //Set the price of a ticket in ether
    function setPrice(uint _newPrice) public onlyOwner returns (uint) {
        price = _newPrice;
        return price;
    }
}