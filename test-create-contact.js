const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

async function testCreateContact() {
  try {
    const abi = JSON.parse(fs.readFileSync('abi/ContactObjects.json'));
    const contract = new web3.eth.Contract(abi, '0xb0941d982aEd0A59414986f52E75fd9c5c6b4202');
    const accounts = await web3.eth.getAccounts();
    const from = accounts[0];
    
    console.log('Testing contract at:', '0xb0941d982aEd0A59414986f52E75fd9c5c6b4202');
    
    // Check initial state
    let total = await contract.methods.totalContactMessageObjects().call();
    console.log('Initial total messages:', total.toString());
    
    // Create a test contact message
    console.log('\n📝 Creating test contact message...');
    const result = await contract.methods.createContactMessageObjects(
      1,
      'John',
      'Doe', 
      'john@example.com',
      '123-456-7890',
      'Test Subject',
      'This is a test message',
      Math.floor(Date.now() / 1000)
    ).send({ from, gas: 500000 });
    
    console.log('✅ Contact created! Transaction:', result.transactionHash);
    
    // Check updated state
    total = await contract.methods.totalContactMessageObjects().call();
    console.log('\nUpdated total messages:', total.toString());
    
    // Get all messages
    const messages = await contract.methods.getAllContactMessages().call();
    console.log('\n📋 All messages:', messages);
    
    if (messages.length > 0) {
      console.log('\n📧 First message details:');
      console.log('- ID:', messages[0].contactId.toString());
      console.log('- Name:', messages[0].firstName, messages[0].lastName);
      console.log('- Email:', messages[0].email);
      console.log('- Subject:', messages[0].subject);
    }
    
    console.log('\n✅ Contract test completed successfully!');
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testCreateContact();