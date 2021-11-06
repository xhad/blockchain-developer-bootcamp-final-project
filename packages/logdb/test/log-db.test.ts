import { expect } from 'chai'
import { ethers, waffle } from 'hardhat'
import { LogDb } from '../types'
import LogDbArtifact from '../artifacts/contracts/LogDb.sol/LogDb.json'

const { deployContract } = waffle

const getStorage = async (address: any, contract: any) => {
  const filter = await contract.filters.DataEvent(address)
  const events = await contract.queryFilter(filter)
  return events.map((event: any) => ({
    sender: event.args.sender,
    data: event.args.data,
  }))
}

describe('Log Db Contract tests', () => {
  let db: LogDb, user: string

  before(async () => {
    const signers = await ethers.getSigners()
    db = (await deployContract(signers[0], LogDbArtifact)) as LogDb
    user = await signers[0].getAddress()
  })

  it('Should save data to evm logs', async () => {
    const data = [
      // the contract to associate metadata
      '0x54241ac4bd04f4bd5690edfc90464b854432544c',

      // arrays of key / values
      ['name', 'John Doe'],
      ['companyName', 'Cabin Fever, LLC'],
      ['twitter', '@cabin'],
      ['website', 'https://cabinfever.finance'],
      [
        'aboutArtist',
        'John puts fear in the hearts of all digital artists north of the mountain pass.',
      ],
    ]

    await (await db.storeData(JSON.stringify(data))).wait()

    const storage = await getStorage(user, db)

    expect(storage.sender === user)

    console.log(storage)
  })
})
