var SimpleEvent = artifacts.require("./SimpleEvent.sol");

contract("SimpleEvent - initialize event, tickets and price count", function(accounts){
    it("should be initialized with 8 tickets and price = 1", async () => {
        const event = await SimpleEvent.deployed();
        remainingTickets = await event.ticketsRemaining.call();
        ticketPrice = await event.getPrice.call();
        assert.equal(remainingTickets, 8, "Initial ticket count is incorrect");
        assert.equal(ticketPrice, 1, "Ticket price is incorrect");
    });

    it("should fail if initialized with nothing", async () => {
        let err = null
        try{
            await SimpleEvent.new();
        } catch (error){
            err = error;
        }
        assert.equal(err.message, "SimpleEvent contract constructor expected 2 arguments, received 0");
    });

    it("should fail if initialized with tickets as zero", async () => {
        let err = null
        try{
            await SimpleEvent.new(0,0);
        } catch (error){
            err = error;
        }
        assert.equal(err.message, "VM Exception while processing transaction: revert");
    });
});
