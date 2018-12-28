pragma solidity ^0.4.23;

//Owned by an address
contract Owned {
    address owner;

    //Only owner modifier
    modifier onlyOwner(){
        require(msg.sender == owner, "Only the owner can do this.");
        _;
    }
}

//Manages events
contract EventManager is Owned{
    //Events
    address[] events;
    //Event organisers => Events[]
    mapping(address => address[]) eventOwners;

    //Event Manager contract creation
    constructor() public payable {
        owner = msg.sender;
    }

    //Create a new event
    //TODO test
    function createNewEvent(string _name, uint _tickets, uint _price) public payable returns(address) {
        address newEvent = new SimpleEvent(_name, _tickets, _price);
        events.push(newEvent);
        eventOwners[msg.sender].push(newEvent);
        return newEvent;
    }

    //Get all events
    //TODO test
    function getAllEvents() public payable returns(address[]) {
        return events;
    }
}

//Simple event selling tickets
contract SimpleEvent is Owned{
    //Original event manager
    address private manager;
    //Name of event
    string private name;
    //Description of event
    string private description;
    //Date of event
    string private date;
    //Name of venue
    string private venue;
    //Number of tickets available
    uint private tickets;
    //Price of tickets
    uint private price;
    //Is the event cancelled
    bool private cancelled;
    //Has the ticket money been refunded
    bool private refunded;

    //Tickets held
    mapping(address => uint) ticketHolders;
    //Balances for each account
    mapping(address => uint) balances;

    //Log on the blockchain that tickets have been bought
    event LogTicketsBought(address indexed accountAddress, uint tickets, uint cost);

    //Create a new Event
    constructor(string _name, uint _tickets, uint _price) public payable {
        require (_tickets > 0, "Number of ticket greater than 0");
        owner = tx.origin;
        manager = msg.sender;
        name = _name;
        tickets = _tickets;
        price = _price;
        cancelled = false;
        refunded = false;
    }

    //Buy tickets for the event
    //TODO Test
    function buyTickets(uint _tickets) public payable returns(uint) {
        require(cancelled == false, "Event has been cancelled");
        require(tickets > 0, "No tickets available");
        require(tickets >= _tickets, "Not enough tickets available");
        require(msg.value >= _tickets * price, "Not enough ether sent to buy that many tickets");
        tickets -= _tickets;
        ticketHolders[msg.sender] = _tickets;
        balances[msg.sender] += msg.value;
        emit LogTicketsBought(msg.sender, _tickets, msg.value);
    }

    //Return price of a ticket in ether
    function getPrice() public view returns(uint) {
        return price;
    }

    //Get the number of tickets remaining
    function ticketsRemaining() public view returns(uint) {
        return tickets;
    }

    //Get name of event
    //TODO Test
    function getName() public view returns(string) {
        return name;
    }

    //Get description of event
    //TODO Test
    function getDescription() public view returns(string) {
        return description;
    }

    //Get date of event
    //TODO Test
    function getDate() public view returns(string) {
        return date;
    }

    //Get the venue
    //TODO test
    function getVenue() public view returns(string) {
        return venue;
    }

    //Check if event has been cancelled
    function isCancelled() public view returns(bool) {
        return cancelled;
    }

    //////-----------OnlyOwner-----------//////

    //Set the price of a ticket in ether
    function setPrice(uint _newPrice) public onlyOwner returns (uint) {
        price = _newPrice;
        return price;
    }

    //Set the name
    //TODO test
    function setName(string _name) public onlyOwner returns(string) {
        name = _name;
        return name;
    }

    //Set the description
    //TODO test
    function setDescription(string _description) public onlyOwner returns(string) {
        description = _description;
        return description;
    }

    //Set the date
    //TODO test
    function setDate(string _date) public onlyOwner returns(string) {
        date = _date;
        return date;
    }

    //Set the venue
    //TODO test
    function setVenue(string _venue) public onlyOwner returns(string) {
        venue = _venue;
        return venue;
    }

    //Cancel event
    //TODO test
    function cancel() public onlyOwner {
        require(cancelled == false, "Event already cancelled");
        cancelled = true;
    }

    //Refund Tickets
    //TODO test
    // function refund(address buyer, uint amount) public onlyOwner returns (bool) {
    //     //TODO
    //     return false;
    // }

    //Withdraw balance from the contract
    //TODO Test
    //TODO Manager takes commission when this method is called
    function withdraw(uint amount) public onlyOwner {
        require(amount >= address(this).balance, "Not enough balance to withdraw that");
        msg.sender.transfer(amount);
    }

    //Only owner modifier
    modifier onlyOwnerOrManager(){
        require(msg.sender == owner || msg.sender == manager, "Only the owner or original events manager can do this.");
        _;
    }

    //Get the contract balance
    //TODO Test
    function getBalance() public onlyOwnerOrManager view returns (uint) {
        return address(this).balance;
    }
}