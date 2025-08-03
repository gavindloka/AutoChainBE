const fs = require('fs');
const { Web3 } = require('web3');
const path = require('path');

const web3 = new Web3('http://127.0.0.1:8545');

async function deployContract(name, from) {
  const abi = JSON.parse(fs.readFileSync(`abi/${name}.json`));
  const bytecode = fs.readFileSync(`bytecode/${name}.txt`, 'utf8');

  const contract = new web3.eth.Contract(abi);
  const instance = await contract
    .deploy({ data: '0x' + bytecode })
    .send({ from, gas: 5000000 });

  console.log(`${name} deployed at:`, instance.options.address);
  return instance;
}

async function main() {
  const accounts = await web3.eth.getAccounts();
  const deployer = accounts[0];

  const carNFT = await deployContract('CarNFT', deployer);
  const carsForRent = await deployContract('CarsForRent', deployer);
  const contactObjects = await deployContract('ContactObjects', deployer);
}

main();
