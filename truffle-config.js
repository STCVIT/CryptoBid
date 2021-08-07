const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider({
          mnemonic:'afraid voyage coyote stumble can air language express shine sign route medal',
          providerOrUrl:
            'https://rinkeby.infura.io/v3/3ab2896ae11d403786349d8911bd3f58'
        }),
      network_id: 4, // Ropsten's id
      gas: 6700000, // Ropsten has a lower block limit than mainnet
      confirmations: 0, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
      // from:"0xAB121dd7eec5999d9bbf72Ceb96A1EE028E3B2DC"
    },
  },
  

  mocha: {

  },
  
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: "0.8.4", 
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
