
const hre = require("hardhat");

async function main() {

  const LogDB = await hre.ethers.getContractFactory("LogDB");
  const logDB = await LogDB.deploy();

  await logDB.deployed();

  console.log("LogDB deployed to:", logDB.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
