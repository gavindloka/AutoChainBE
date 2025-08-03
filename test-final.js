const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://127.0.0.1:8545');

async function testFinal() {
  try {
    const abi = JSON.parse(fs.readFileSync('abi/ContactObjects.json'));
    const contract = new web3.eth.Contract(abi, '0x0BE90B20e76e7F652854a76a8907616053C0Bb72');
    const accounts = await web3.eth.getAccounts();
    
    console.log('🧪 Testing optimized contract...');
    
    // Test getAllContactMessages (should be empty initially)
    let messages = await contract.methods.getAllContactMessages().call();
    console.log('Initial messages:', messages.length);
    
    // Create a contact
    console.log('📝 Creating contact...');
    const result = await contract.methods.createContactMessage(
      'John Doe',
      'john@example.com', 
      'Hello, this is a test message!'
    ).send({ from: accounts[0], gas: 150000 });
    
    console.log('✅ Contact created! TX:', result.transactionHash);
    
    // Get messages again
    messages = await contract.methods.getAllContactMessages().call();
    console.log('📋 Total messages:', messages.length);
    
    if (messages.length > 0) {
      console.log('📧 First message:');
      console.log('- ID:', messages[0].contactId.toString());
      console.log('- Name:', messages[0].firstName);
      console.log('- Email:', messages[0].email);
      console.log('- Message:', messages[0].message);
    }
    
    console.log('🎉 Contract working perfectly!');
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  }
}

testFinal();