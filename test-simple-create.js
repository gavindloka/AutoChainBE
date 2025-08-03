const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

async function testSimpleCreate() {
  try {
    const abi = JSON.parse(fs.readFileSync('abi/ContactObjects.json'));
    const contract = new web3.eth.Contract(abi, '0xb0941d982aEd0A59414986f52E75fd9c5c6b4202');
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    
    console.log('Testing with minimal data...');
    
    // Test with minimal required data
    const result = await contract.methods.createContactMessageObjects(
      1,           // id
      'John',      // firstName (required)
      '',          // lastName (optional)
      'test@test.com', // email (required)
      '',          // phone (optional)
      '',          // subject (optional)
      '',          // message (optional)
      1234567890   // timestamp (required)
    ).send({ from, gas: 300000 });
    
    console.log('✅ Success! Transaction:', result.transactionHash);
    
    // Now get all messages
    const messages = await contract.methods.getAllContactMessages().call();
    console.log('Messages:', messages);
    
  } catch (error) {
    console.log('❌ Error:', error.message);
    
    // Try to call the function to see what validation fails
    try {
      await contract.methods.createContactMessageObjects(
        1, 'John', '', 'test@test.com', '', '', '', 1234567890
      ).call({ from });
      console.log('Call succeeded - issue is with gas or transaction');
    } catch (callError) {
      console.log('Call failed:', callError.message);
    }
  }
}

testSimpleCreate();