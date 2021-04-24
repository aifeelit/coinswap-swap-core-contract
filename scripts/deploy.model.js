const path = require('path');
const fs = require('fs');

function DeployModel() {

  const self = this

  this.deployerAddress = null
  this.factory = null
  this.cssToken = null
  this.masterCss = null
  this.router = null
  this.referral = null
  this.hash = null

  this.toJsonFile = function toJsonFile() {
    fs.writeFileSync( path.join('./', 'config-factory.json'), JSON.stringify({
        factory: self.factory.address,
        hash: self.hash,
      }
    ))
  }
}

module.exports = { DeployModel: DeployModel }
