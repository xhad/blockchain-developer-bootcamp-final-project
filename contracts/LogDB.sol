//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.0;

contract LogDB {

  event DataEvent (address indexed sender, string data);

  function storeData (string calldata data) public {
    emit DataEvent (msg.sender, data);
  }
}
