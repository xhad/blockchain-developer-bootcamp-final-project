const { expect } = require("chai");
const { ethers } = require("hardhat");

const getStorage = async (address, contract) => {
  const filter = await contract.filters.DataEvent(address);
  const events = await contract.queryFilter(filter);
  return events.map(event => (
    { sender: event.args.sender, data: event.args.data })
  )
};

let wood, sender

before(async () => {
  const wood = await ethers.getContractFactory('wood');
  wood = await (await wood.deploy()).deployed()

  sender = await ethers.provider.getSigner(0).getAddress()
})

describe("Call wood", function() {

  it ("Should save data to the logs", async function () {

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
        'Cabin Fever, LLC'
      ],
      [
        'twitter',
        '@cabin'
      ],
      [
        'website',
        'https://cabinfever.finance'
      ],
      [
        'aboutArtist',
        'John puts fear in the hearts of all digital artists north of the mountain pass.'
      ]
    ]

    await(await wood.storeData(JSON.stringify(data))).wait()
    
    const storage = await getStorage(sender, wood);

    expect(storage.sender === sender)

    console.log(storage)
  })
})
