const { deployer } = require('../secrets.json')
const { DeployModel } = require('./deploy.model')

async function factoryDeploy(deployData) {

  if (!deployData)
    deployData = new DeployModel();

  const deployerAddress = deployer

  deployData.deployerAddress = deployer

  const CoinswapFactory = await ethers.getContractFactory("CoinSwapFactory");

  const factory = await CoinswapFactory.deploy(deployerAddress);

  console.log("Factory deployed to:", factory.address);

  deployData.factory = factory
  console.log("Factory deployed by:", deployerAddress);

  const feeToSetter = await factory.feeToSetter()
  console.log("feeToSetter:", feeToSetter);

  const hash = await factory.INIT_CODE_PAIR_HASH();
  deployData.hash = hash;
  console.log("hash:", hash);
  deployData.toJsonFile();
  return deployData;
}

factoryDeploy()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

module.exports = { factoryDeploy: factoryDeploy}