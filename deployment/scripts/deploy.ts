import { ethers } from 'hardhat';

async function main() {
  const nft = await ethers.deployContract('CarNFT');
  const contact = await ethers.deployContract('ContactObjects');
  const carListing = await ethers.deployContract('CarsForRent');

  await nft.waitForDeployment();
  await contact.waitForDeployment();
  await carListing.waitForDeployment();

  console.log('NFT Contract Deployed at ' + nft.target);
  console.log('Contact Contract Deployed at ' + contact.target);
  console.log('Car Listing Contract Deployed at ' + carListing.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
