pragma solidity ^0.4.23;

//Simple event selling tickets
contract SimpleEvent {
    //Owner of this contract
    address public owner;
    //Number of tickets available
    uint8 private tickets;

    //Create a new Event
    constructor(uint8 _tickets) public payable {
        require (_tickets > 1, "Please enter the number of tickets");
        owner = msg.sender;
        tickets = _tickets;
    }

    //Get the number of tickets remaining
    function ticketsRemaining() public view returns(uint8) {
        return tickets;
    }
}