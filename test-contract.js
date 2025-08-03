const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

async function testContract() {
  try {
    const abi = JSON.parse(fs.readFileSync('abi/ContactObjects.json'));
    const contract = new web3.eth.Contract(abi, '0x7910592c9E95e78A39cfAc743BD55FD92dF24F7B');
    
    console.log('Testing contract at:', '0x7910592c9E95e78A39cfAc743BD55FD92dF24F7B');
    
    // Test totalContactMessageObjects first (simpler function)
    const total = await contract.methods.totalContactMessageObjects().call();
    console.log('Total messages:', total);
    
    // Test getAllContactMessages
    const messages = await contract.methods.getAllContactMessages().call();
    console.log('All messages:', messages);
    
    console.log('✅ Contract is working correctly!');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testContract();