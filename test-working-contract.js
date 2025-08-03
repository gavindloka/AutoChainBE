const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

async function testWorkingContract() {
  try {
    const abi = JSON.parse(fs.readFileSync('abi/WorkingContact.json'));
    const contract = new web3.eth.Contract(abi, '0xb3A6A3c8E6356EFD8dD41Fdc89d231D630886Ba8');
    
    console.log('Testing WorkingContact at:', '0xb3A6A3c8E6356EFD8dD41Fdc89d231D630886Ba8');
    
    // Test basic functions first
    const count = await contract.methods.getMessagesCount().call();
    console.log('Messages count:', count.toString());
    
    const total = await contract.methods.totalContactMessageObjects().call();
    console.log('Total messages:', total.toString());
    
    // Test getAllContactMessages
    const messages = await contract.methods.getAllContactMessages().call();
    console.log('All messages:', messages);
    
    console.log('✅ WorkingContract is functioning correctly!');
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testWorkingContract();