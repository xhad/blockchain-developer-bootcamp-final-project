## Consensys Academy

# LogDB
"Log DB is the MongoDB killer of the Web3 world." - Jason

<img src="log.svg">


## Data Store

LogDb is a simple data storage protocol that stores offcahin metadata with event logs more cheaply than onchain storage.

Just emit an event to store metadata associated with a given contract address. See the test for an example.

```
npm i
npm run node
# new terminal
npm run compile
npm run deploy
npm run test
```

The following is an example event log with data strcutured as:

`[ {some contact address}, [ {key}, {value} ]...]`

```
[
  {
    sender: '0xa0b30De2833294C200a376B0e8205b9517bF021F',
    data: '[
      "0x54241ac4bd04f4bd5690edfc90464b854432544c",
      ["name","John Doe"],
      ["companyName","Acme Research, LLC"],
      ["twitter","@acmeresearch"],
      ["website","https://acmeresearch.com"],
      ["aboutArtist","John Doe is a world digital artist."]
    ]'
  }
]
```

