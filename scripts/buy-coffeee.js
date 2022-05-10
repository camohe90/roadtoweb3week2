// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");


async function getBalance(address){
  const balanceBigInit = await hre.waffle.provider.getBalance(address)
  return hre.ethers.utils.formatEther(balanceBigInit);
}

async function printBalances(address){
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
  const [owner, tipper1, tipper2] = await hre.ethers.getSigners();

  //Get the conrtract to deploy
  const BuyMeACoffee = await hre.ethers.getContractFactory("BuyMeACofffe")
  //Deploy contract

  //Check the balance before the cofee purchase

  //Buy the owner a few coffess

  //Check balances after coffee purcharse

  //Check balance after withdraw

  //read all the memos



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
