import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import 'hardhat-gas-reporter'

import dotenv from 'dotenv'

dotenv.config()

const config = {
  solidity: '0.7.3',
  defaultNetwork: 'localhost',
  paths: {
    sources: './contracts',
    artifacts: './artifacts',
    cache: './cache',
    tests: './tests',
  },
  gasReporter: {
    showMethodSig: true,
    currency: 'USD',
    gasPrice: 21,
    coinmarketcap: process.env.COINMARKETCAP_KEY,
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5',
    alwaysGenerateOverloads: false,
    externalArtifacts: ['externalArtifacts/*.json'],
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 200000,
    bail: true,
  },
  contractSizer: {
    alphaSort: false,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.HARDHAT_MNEMONIC,
      },
    },
    ...(process.env.NETWORK === 'localhost'
      ? {
          localhost: {
            url: process.env.HARDHAT_URL || 'http://localhost:8545',
            accounts: {
              mnemonic: process.env.HARDHAT_MNEMONIC,
            },
          },
        }
      : {}),
    ...(process.env.NETWORK === 'rinkeby'
      ? {
          rinkeby: {
            url: process.env.RINKEBY_RPC_URL,
            accounts: [`0x${process.env.RINKEBY_DEPLOYER_PRIVATE_KEY}`],
            gasPrice: 1 * 10 ** 9,
          },
        }
      : {}),
    ...(process.env.NETWORK === 'kovan'
      ? {
          kovan: {
            url: process.env.KOVAN_RPC_URL,
            accounts: [`0x${process.env.KOVAN_DEPLOYER_PRIVATE_KEY}`],
            gasPrice: 1 * 10 ** 9,
          },
        }
      : {}),
    ...(process.env.NETWORK === 'mainnet'
      ? {
          mainnet: {
            url: process.env.MAINNET_RPC_URL,
            accounts: [`0x${process.env.MAINNET_DEPLOYER_PRIVATE_KEY}`],
            gasPrice: 120 * 10 ** 9,
          },
        }
      : {}),
  },
}

export default config
