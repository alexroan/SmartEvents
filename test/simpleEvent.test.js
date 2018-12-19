var SimpleEvent = artifacts.require("./SimpleEvent.sol");

contract("SimpleEvent - initialize event, check ticket count", function(accounts){
    it("should be initialized with 8 tickets", async () => {
        const event = await SimpleEvent.deployed(8);
        remainingTickets = await event.ticketsRemaining.call();
        assert.equal(remainingTickets, 8, "Initial ticket count is incorrect");
    });

    it("should fail if initialized with nothing", async () => {
        let err = null;
        const event = await SimpleEvent.deployed();
        try{
            event = SimpleEvent.new();
        } catch (error) {
            err = error;
        }
        assert.notEqual(err, null, "Initialization allowed no parameters");
    });
});
