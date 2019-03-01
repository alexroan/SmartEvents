var SimpleEvent = artifacts.require("SimpleEvent");

/**
 * Owner getter and setter tests
 */
contract("SimpleEvent - Only Owner Getters and Setters", function (accounts){
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

    it("should allow the owner to set the name", async () => {
        const name = "New Event Name";
        const event = await SimpleEvent.deployed();
        await event.setName(name, {from: alice});
        newEventName = await event.getName.call();
        assert.equal(newEventName, name, "Event name incorrect");
    });

    it("should not allow anyone other than the owner to set the name", async () => {
        const event = await SimpleEvent.deployed();
        name = "New Name";
        for (let index = 1; index < accounts.length; index++) {
            const account = accounts[index];
            try{
                await event.setName(name, {from: account});
            } catch (error){
                err = error;
            }
            assert.equal(err.message, "VM Exception while processing transaction: revert");
        }
    });

    it("should allow the owner to set the description", async () => {
        const description = "New Event Description";
        const event = await SimpleEvent.deployed();
        await event.setDescription(description, {from: alice});
        newEventDescription = await event.getDescription.call();
        assert.equal(newEventDescription, description, "Event description incorrect");
    });

    it("should not allow anyone other than the owner to set the description", async () => {
        const event = await SimpleEvent.deployed();
        description = "New Description";
        for (let index = 1; index < accounts.length; index++) {
            const account = accounts[index];
            try{
                await event.setDescription(description, {from: account});
            } catch (error){
                err = error;
            }
            assert.equal(err.message, "VM Exception while processing transaction: revert");
        }
    });

    it("should allow the owner to set the date", async () => {
        const date = "New Event Date";
        const event = await SimpleEvent.deployed();
        await event.setDate(date, {from: alice});
        newEventDate = await event.getDate.call();
        assert.equal(newEventDate, date, "Event date incorrect");
    });

    it("should not allow anyone other than the owner to set the date", async () => {
        const event = await SimpleEvent.deployed();
        date = "New Date";
        for (let index = 1; index < accounts.length; index++) {
            const account = accounts[index];
            try{
                await event.setDate(date, {from: account});
            } catch (error){
                err = error;
            }
            assert.equal(err.message, "VM Exception while processing transaction: revert");
        }
    });

    it("should allow the owner to set the venue", async () => {
        const venue = "New Event Venue";
        const event = await SimpleEvent.deployed();
        await event.setVenue(venue, {from: alice});
        newEventVenue = await event.getVenue.call();
        assert.equal(newEventVenue, venue, "Event venue incorrect");
    });

    it("should not allow anyone other than the owner to set the venue", async () => {
        const event = await SimpleEvent.deployed();
        venue = "New Venue";
        for (let index = 1; index < accounts.length; index++) {
            const account = accounts[index];
            try{
                await event.setVenue(venue, {from: account});
            } catch (error){
                err = error;
            }
            assert.equal(err.message, "VM Exception while processing transaction: revert");
        }
    });

    it("should allow the owner to cancel the event", async () => {
        const event = await SimpleEvent.deployed();
        await event.cancel({from: alice});
        isCancelled = await event.isCancelled.call();
        assert.equal(isCancelled, true, "Event not cancelled correctly");
    });

    it("should not allow anyone other than the owner to cancel the event", async () => {
        const event = await SimpleEvent.deployed();
        for (let index = 1; index < accounts.length; index++) {
            const account = accounts[index];
            try{
                await event.cancel({from: account});
            } catch (error){
                err = error;
            }
            assert.equal(err.message, "VM Exception while processing transaction: revert");
        }
    });
});

/**
 * Initializaton tests
 */
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

contract("SimpleEvent - Buying tickets", function(accounts){
    const alice = accounts[0];
    const bob = accounts[1];
    const price = 1;
    const numberOfTickets = 10;
    const totalMsgValue = price*numberOfTickets;

    it("should allow tickets to be purchased", async () => {
        var myEvent = await SimpleEvent.new("New Event", numberOfTickets, price);
        ticketsBought = await myEvent.buyTickets.call(numberOfTickets, {from: bob, value: totalMsgValue});
        assert.equal(numberOfTickets, ticketsBought, "Wrong number of tickets bought");
    });

    it("should fail if not enough ether is sent", async () => {
        let err = null;
        const event = await SimpleEvent.new("New Event", numberOfTickets, price);
        try{
            await event.buyTickets.call(numberOfTickets+1, {from: bob, value: totalMsgValue});
        } catch (error){
            err = error;
        }
        assert.equal(err.message, "VM Exception while processing transaction: revert");
    });

    it("should fail if there are no tickets left", async () => {
        let err = null;
        const event = await SimpleEvent.new("New Event", 1, price);
        await event.buyTickets.call(1, {from: bob, value: price});
        try{
            await event.buyTickets.call(numberOfTickets, {from: bob, value: totalMsgValue});
        } catch (error){
            err = error;
        }
        assert.equal(err.message, "VM Exception while processing transaction: revert");
    });

    it("should fail if there there are not enough tickets left", async () => {
        let err = null;
        const event = await SimpleEvent.new("New Event", numberOfTickets-1, price);
        try{
            await event.buyTickets.call(numberOfTickets, {from: bob, value: totalMsgValue});
        } catch (error){
            err = error;
        }
        assert.equal(err.message, "VM Exception while processing transaction: revert");
    });
});
