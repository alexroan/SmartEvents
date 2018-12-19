var SimpleEvent = artifacts.require("./SimpleEvent.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleEvent, 8, 1);
};