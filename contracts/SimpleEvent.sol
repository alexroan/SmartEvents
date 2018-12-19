pragma solidity ^0.4.23;

contract SimpleEvent {
    //owner of this contract
    address public owner;
    uint8 private tickets;


    constructor(uint8 _tickets) public payable {
        require (_tickets > 0, "Please enter the number of tickets");
        owner = msg.sender;
        tickets = _tickets;
    }

    function ticketsRemaining() public view returns(uint8) {
        return tickets;
    }
}