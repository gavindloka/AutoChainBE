const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

async function debugTest() {
  try {
    const abi = JSON.parse(fs.readFileSync('abi/ContactObjects.json'));
    const contractAddress = '0xb0941d982aEd0A59414986f52E75fd9c5c6b4202';
    const contract = new web3.eth.Contract(abi, contractAddress);
    
    console.log('Testing contract at:', contractAddress);
    
    // Check if contract exists
    const code = await web3.eth.getCode(contractAddress);
    console.log('Contract code exists:', code !== '0x');
    
    // Test each function individually
    try {
      const total = await contract.methods.totalContactMessageObjects().call();
      console.log('✅ totalContactMessageObjects:', total.toString());
    } catch (e) {
      console.log('❌ totalContactMessageObjects failed:', e.message);
    }
    
    try {
      const count = await contract.methods.getContactMessagesCount().call();
      console.log('✅ getContactMessagesCount:', count.toString());
    } catch (e) {
      console.log('❌ getContactMessagesCount failed:', e.message);
    }
    
    try {
      const messages = await contract.methods.getAllContactMessages().call();
      console.log('✅ getAllContactMessages:', messages);
    } catch (e) {
      console.log('❌ getAllContactMessages failed:', e.message);
    }
    
  } catch (error) {
    console.log('❌ General error:', error.message);
  }
}

debugTest();