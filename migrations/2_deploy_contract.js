var SimpleEvent = artifacts.require("./SimpleEvent.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleEvent, "My Event", 8, 1);
};