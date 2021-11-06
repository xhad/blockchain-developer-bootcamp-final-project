import hre from 'hardhat'

async function main() {
  const LogDb = await hre.ethers.getContractFactory('LogDb')
  const db = await LogDb.deploy()

  await db.deployed()

  console.log('Db Contract deployed at:', db.address)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
