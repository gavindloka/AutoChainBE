const fs = require('fs');
const path = require('path');
const solc = require('solc');

// Load all .sol files
const contractFiles = ['CarListings.sol', 'CarNFT.sol', 'contact.sol'];
const sources = {};

for (const file of contractFiles) {
  const filePath = path.resolve(__dirname, 'contracts', file);
  sources[file] = { content: fs.readFileSync(filePath, 'utf8') };
}

// Add OpenZeppelin import resolution
function findImports(importPath) {
  if (importPath.startsWith('@openzeppelin/')) {
    try {
      const resolvedPath = path.resolve(__dirname, 'node_modules', importPath);
      return { contents: fs.readFileSync(resolvedPath, 'utf8') };
    } catch (e) {
      return { error: 'File not found' };
    }
  }
  return { error: 'File not found' };
}

// Compile
const input = {
  language: 'Solidity',
  sources,
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

const output = JSON.parse(solc.compile(JSON.stringify(input), { import: findImports }));

if (output.errors) {
  output.errors.forEach(error => {
    console.log(error.formattedMessage);
  });
}

// Save each ABI and bytecode
for (const file in output.contracts) {
  for (const contractName in output.contracts[file]) {
    const contract = output.contracts[file][contractName];

    fs.writeFileSync(
      path.join(__dirname, 'abi', `${contractName}.json`),
      JSON.stringify(contract.abi, null, 2)
    );
    fs.writeFileSync(
      path.join(__dirname, 'bytecode', `${contractName}.txt`),
      contract.evm.bytecode.object
    );

    console.log(`Compiled ${contractName}`);
  }
}
