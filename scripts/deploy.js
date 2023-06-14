async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const Data = await ethers.getContractFactory("recipentErc20");
  const data = await Data.connect(deployer).deploy(deployer.address,10000000000,10,false);
  await data.deployed();
  console.log("Pairs Deployed~!")
  console.log("Pairs Contract address:", data.address);
} 

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
  //npx hardhat run scripts/deploy.js --network mumbai