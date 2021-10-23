
const hre = require("hardhat");

async function main() {

  const Wood = await hre.ethers.getContractFactory("Wood");
  const wood = await Wood.deploy();

  await wood.deployed();

  console.log("Wood deployed to:", wood.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
