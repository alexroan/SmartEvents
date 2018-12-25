var SimpleEvent = artifacts.require("./SimpleEvent.sol");

contract("SimpleEvent - Setting price", function (accounts){
    const alice = accounts[0];
    const bob = accounts[1];
    it("should allow the owner to set the price", async () => {
        const price = 25;
        const event = await SimpleEvent.deployed();
        await event.setPrice(price, {from: alice});
        newTicketPrice = await event.getPrice.call();
        assert.equal(newTicketPrice, price, "Ticket price incorrect");
    });

    it("should not allow anyone other than the owner to set the price", async () => {
        const event = await SimpleEvent.deployed();
        price = 11;
        for (let index = 1; index < accounts.length; index++) {
            const account = accounts[index];
            try{
                await event.setPrice(price, {from: account});
            } catch (error){
                err = error;
            }
            assert.equal(err.message, "VM Exception while processing transaction: revert");
        }
    });
});

contract("SimpleEvent - Initialize event, tickets and price count", function(accounts){
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
        assert.equal(err.message, "SimpleEvent contract constructor expected 3 arguments, received 0");
    });

    it("should fail if initialized with tickets as zero", async () => {
        let err = null
        try{
            await SimpleEvent.new("Some event",0,0);
        } catch (error){
            err = error;
        }
        assert.equal(err.message, "VM Exception while processing transaction: revert");
    });
});
