const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

async function testCreate() {
  try {
    const abi = JSON.parse(fs.readFileSync('abi/ContactObjects.json'));
    const contract = new web3.eth.Contract(abi, '0x42639934E4C0BD251446A4cbcFC39894233280e4');
    const accounts = await web3.eth.getAccounts();
    
    console.log('📝 Creating contact message...');
    
    const result = await contract.methods.createContactMessage(
      'John Doe',
      'john@example.com',
      'Hello, this is a test message!'
    ).send({ from: accounts[0], gas: 200000 });
    
    console.log('✅ Contact created! TX:', result.transactionHash);
    
    // Get all messages
    const messages = await contract.methods.getAllContactMessages().call();
    console.log('📋 Total messages:', messages.length);
    
    if (messages.length > 0) {
      console.log('📧 Message details:');
      console.log('- ID:', messages[0].contactId.toString());
      console.log('- Name:', messages[0].firstName);
      console.log('- Email:', messages[0].email);
      console.log('- Message:', messages[0].message);
    }
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testCreate();