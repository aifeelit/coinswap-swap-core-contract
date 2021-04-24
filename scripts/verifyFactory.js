const { exec } =  require('child_process');
const { factory } = require('../config-factory.json')
const { deployer } = require('../secrets.json')
/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

async function verifyFactory() {
  let { stdout } = await sh(`npx hardhat verify ${factory} ${deployer} --network testnet`);
  for (let line of stdout.split('\n')) {
    console.log(`${line}`);
  }
}

verifyFactory()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
