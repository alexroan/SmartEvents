var EventManager = artifacts.require("EventManager");
var SimpleEvent = artifacts.require("SimpleEvent");

module.exports = function(deployer) {
  deployer.deploy(EventManager);
  deployer.deploy(SimpleEvent, "My Event", 8, 1);
};