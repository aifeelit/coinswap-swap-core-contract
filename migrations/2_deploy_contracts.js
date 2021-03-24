const CoinSwapFactory = artifacts.require("CoinSwapFactory.sol");
const CalHash = artifacts.require("CalHash.sol");
const TestToken1 = artifacts.require("TestToken1.sol");
const TestToken2 = artifacts.require("TestToken2.sol");


module.exports = async function (deployer, network, addresses) {
  await deployer.deploy(CoinSwapFactory, addresses[0]);
  const factory = await CoinSwapFactory.deployed();

  let token1Adress, token2Adress;
  if (network == 'testnet' || network == 'bsc') {
    token1Adress = '';
    token2Adress = '';
  } else {
    await deployer.deploy(TestToken1);
    await deployer.deploy(TestToken2);
    const token1 = await TestToken1.deploy();
    const token2 = await TestToken2.deploy();
    token1Adress = token1.address;
    token2Adress = token2.address;

  }
  await factory.createPair(token1Adress, token2Adress);
  await deployer.deploy(CalHash);

};
