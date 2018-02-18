const fs = require('fs');
const path = require('path');

module.exports.getContracts = (cwd, networkName) => {
  const deploymentFile = path.resolve(cwd, `../../../tpt/seedom-solidity/deployment/${networkName}.json`);
  const deploymentData = fs.readFileSync(deploymentFile);
  const deployment = JSON.parse(deploymentData);
  const releases = deployment.releases.seedom.slice(0, 6);

  // cache outputs
  const outputs = {};
  const contracts = [];
  for (const release of releases) {
    let output;
    // grab and cache outputs
    if (release.hash in outputs) {
      output = outputs[release.hash];
    } else {
      const outputFile = path.resolve(cwd, `../../../tpt/seedom-solidity/output/${release.hash}.json`);
      const outputData = fs.readFileSync(outputFile);
      output = JSON.parse(outputData);
      outputs[release.hash] = output;
    }

    contracts.push({
      address: release.address,
      abi: output.abi
    });
  }

  return contracts;
};