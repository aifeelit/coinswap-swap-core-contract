const { exec } =  require('child_process');
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

async function deployAndVerify() {
  await runAndLog(`npx hardhat run scripts/deployFactory.js --network ${process.env.HARDHAT_NETWORK}`);
  await runAndLog(`npx hardhat run scripts/verifyFactory.js --network ${process.env.HARDHAT_NETWORK}`);
}

async function runAndLog(cmd) {
  let { stdout } = await sh(cmd);
  for (let line of stdout.split('\n')) {
    console.log(`${line}`);
  }
}
deployAndVerify()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
