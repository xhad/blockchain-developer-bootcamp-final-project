const { expect } = require("chai");
const { ethers } = require("hardhat");

const getStorage = async (address, contract) => {
  const filter = await contract.filters.DataEvent(address);
  const events = await contract.queryFilter(filter);
  return events.map(event => (
    { sender: event.args.sender, data: event.args.data })
  )
};

let logDb, sender

before(async () => {
  const LogDB = await ethers.getContractFactory('LogDB');
  logDb = await (await LogDB.deploy()).deployed()

  sender = await ethers.provider.getSigner(0).getAddress()
})

describe("Call LogDB", function() {

  it ("Should save data to the log", async function () {

    const data = [
      // the contract to associate metadata
      '0x54241ac4bd04f4bd5690edfc90464b854432544c',

      // arrays of key / values
      [
        'name',
        'John Doe'
      ],
      [
        'companyName',
        'Acme Research, LLC'
      ],
      [
        'twitter',
        '@acmeresearch'
      ],
      [
        'website',
        'https://acmeresearch.com'
      ],
      [
        'aboutCompany',
        'Acme Research will pull money out of the air with magic code.'
      ]
    ]

    await(await logDb.storeData(JSON.stringify(data))).wait()
    
    const storage = await getStorage(sender, logDb);

    expect(storage.sender === sender)

    console.log(storage)
  })
})
