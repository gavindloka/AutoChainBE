const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

async function testSimpleContract() {
  try {
    const abi = JSON.parse(fs.readFileSync('abi/ContactObjectsSimple.json'));
    const contract = new web3.eth.Contract(abi, '0xF78564a26576C7b709E951793125C15B9eDCE99d');
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    
    console.log('Testing simple contract...');
    
    // Create a contact message
    const result = await contract.methods.createContactMessageObjects(
      1,
      'John',
      'Doe', 
      'john@example.com',
      '123-456-7890',
      'Test Subject',
      'This is a test message',
      Math.floor(Date.now() / 1000)
    ).send({ from, gas: 300000 });
    
    console.log('✅ Contact created! Transaction:', result.transactionHash);
    
    // Get all messages
    const messages = await contract.methods.getAllContactMessages().call();
    console.log('📋 Messages:', messages);
    
    if (messages.length > 0) {
      console.log('📧 Message details:');
      console.log('- Name:', messages[0].firstName, messages[0].lastName);
      console.log('- Email:', messages[0].email);
      console.log('- Subject:', messages[0].subject);
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testSimpleContract();