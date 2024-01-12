const hre = require("hardhat");

async function main() {
  // const NFT = await hre.ethers.getContractFactory("NFT");
  // const nft = await NFT.deploy("VANDUC", "VDC");

  // const Marketplace = await hre.ethers.getContractFactory("Marketplace");
  // const marketplace = await Marketplace.deploy(1);

  // await nft.deployed();
  
  // console.log("Successfully deployed smart contract to: ", nft.address);

  // await marketplace.deployed();
  
  // console.log("Successfully deployed marketplace smc to: ", marketplace.address);


  const Auction = await hre.ethers.getContractFactory("Auction");
  // const auction = await Auction.deploy("0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889","0x6B713f0DEB67Cd3bFa13a9662C7B8926303618f4");
  const auction = await Auction.deploy("0x6B713f0DEB67Cd3bFa13a9662C7B8926303618f4");
  console.log('auction smc deployed at: ', auction.address);

}
// Successfully deployed smart contract to:  0x6B713f0DEB67Cd3bFa13a9662C7B8926303618f4
// Successfully deployed marketplace smc to:  0xFE50B3B5c66fE8fd25038724C7CcBcA07105bfc1
//auction smc deployed at:  0xEBff399A4d43440FB7A4F3105a48b1dC43784e24

// auction smc deployed at:  0x4090E806427B021c6d51056E5ae8c19180899E6a   //auction smc deployed at:  0xb07C9E18F3D572853e576D2375a1fA1ac022A5B0

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// npx hardhat run scripts/deploy.ts --network polygon
// npx hardhat verify --network polygon 0x47a676d4876116778e0c31bFDEa5567dbb757037