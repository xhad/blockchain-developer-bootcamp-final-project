require('dotenv').config({ path: '.env' })
require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')
require("hardhat-gas-reporter");

module.exports = {
  defaultNetwork: process.env.NETWORK || 'localhost',
  gasReporter: {
    showMethodSig: true,
    currency: 'USD',
    gasPrice: 21,
    coinmarketcap: process.env.COINMARKETCAP_KEY
  },
  solidity: '0.7.3',
  paths: {
    sources: './contracts',
    artifacts: './artifacts',
    cache: './cache',
    tests: './tests'
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.HARDHAT_MNEMONIC
      }
    },
    ...(process.env.NETWORK === 'localhost'
      ? {
          localhost: {
            url: process.env.HARDHAT_URL || 'http://localhost:8545',
            accounts: {
              mnemonic: process.env.HARDHAT_MNEMONIC
            }
          }
        }
      : {}),
    ...(process.env.NETWORK === 'rinkeby'
      ? {
          rinkeby: {
            url: process.env.RINKEBY_RPC_URL,
            accounts: [`0x${process.env.RINKEBY_DEPLOYER_PRIVATE_KEY}`],
            gasPrice: parseInt(process.env.GAS_PRICE) || 1 * 10 ** 9
          }
        }
      : {}),
    ...(process.env.NETWORK === 'kovan'
      ? {
          kovan: {
            url: process.env.KOVAN_RPC_URL,
            accounts: [`0x${process.env.KOVAN_DEPLOYER_PRIVATE_KEY}`],
            gasPrice: parseInt(process.env.GAS_PRICE) || 1 * 10 ** 9
          }
        }
      : {}),
    ...(process.env.NETWORK === 'mainnet'
      ? {
          mainnet: {
            url: process.env.MAINNET_RPC_URL,
            accounts: [`0x${process.env.MAINNET_DEPLOYER_PRIVATE_KEY}`],
            gasPrice: parseInt(process.env.GAS_PRICE) || 120 * 10 ** 9
          }
        }
      : {})
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },
  mocha: {
    timeout: 200000,
    bail: true
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false
  }
}
