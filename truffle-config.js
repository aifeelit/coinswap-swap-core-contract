
   const HDWalletProvider = require('truffle-hdwallet-provider');
   const fs = require('fs');
   const privKey = fs.readFileSync(".secret").toString().trim();

module.exports = {

  networks: {
   
      local: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      },

      testnet: {
      provider: () => new HDWalletProvider(privKey, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,       
      confirmations: 10,    
      timeoutBlocks: 200,  
      skipDryRun: true    
      },

      bsc: {
      provider: () => new HDWalletProvider(privKey, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
      },

  },

  plugins: [
  'truffle-plugin-verify'
],
api_keys: {
  bscscan: fs.readFileSync(".env").toString()
},
  mocha: {
  },

  compilers: {
    solc: {
       version: "0.5.16",    
       settings: {          
        optimizer: {
          enabled: false,
          runs: 200
        },
    },
  },
}
};
