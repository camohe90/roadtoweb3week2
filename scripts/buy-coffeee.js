// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { constants } = require("ethers");
const hre = require("hardhat");


async function getBalance(address){
  const balanceBigInit = await hre.waffle.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balanceBigInit);
}

async function printBalances(addresses){
  let idx = 0;
  for (const address of addresses){
    console.log(`Address ${idx} balance` , await getBalance(address));
    idx++;
  }
}

async function printMemos(memos){
  for(const memo of memos){
    const timestamp = memo.timestamp;
    const tipper = memo.name;
    const tipperAddress = memo.from;
    const message = memo.message;
    console.log(`at ${timestamp}, ${tipper} (${tipperAddress}) said ${message}`);

  }
}


async function main() {
  //Get example accounts.
  const [owner, tipper1, tipper2, tipper3] = await hre.ethers.getSigners();

  //Get the conrtract to deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACofffe")
  //Deploy contract

  const buyMeACoffee = await BuyMeACoffee.deploy();
  await buyMeACoffee.deployed();
  console.log("BuyMeACoffee deploy to", buyMeACoffee.address);

  //Check the balance before the cofee purchase
  const addresses = [owner.address, tipper1.address, buyMeACoffee.address];
  console.log("==START==");
  await printBalances(addresses);
  //Buy the owner a few coffess
  const tip = {value: hre.ethers.utils.parseEther("1")};
  await buyMeACoffee.connect(tipper1).buyCoffee("Bolt","Playing with hardhat",tip);
  await buyMeACoffee.connect(tipper2).buyCoffee("Hally","Playing with eth",tip);
  await buyMeACoffee.connect(tipper3).buyCoffee("Lucky","Buying some coffee",tip);
  
  //Check balances after coffee purcharse
  console.log("==Bougth coffee==");
  await printBalances(addresses);
  //Check balance after withdraw
  await buyMeACoffee.connect(owner).withdrawTips();
  console.log("==Withdorw tips==");
  await printBalances(addresses);
  //read all the memos
  console.log("==MEMOS===");
  const memos = await buyMeACoffee.getMemos();
  printMemos(memos);


}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
