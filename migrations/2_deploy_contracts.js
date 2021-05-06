const Blockauction = artifacts.require("Auction");

module.exports = function(deployer) {
  deployer.deploy(Blockauction);
};