const fs = require("fs");
const path = require("path");
const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const AgentRegistry = await ethers.getContractFactory("AgentRegistry");
  const registry = await AgentRegistry.deploy();
  await registry.waitForDeployment();
  console.log("AgentRegistry deployed to:", await registry.getAddress());

  const TaskMarketplace = await ethers.getContractFactory("TaskMarketplace");
  const marketplace = await TaskMarketplace.deploy();
  await marketplace.waitForDeployment();
  console.log("TaskMarketplace deployed to:", await marketplace.getAddress());

  const contractsDir = path.join(__dirname, "..", "..", "frontend", "src", "contracts");
  fs.mkdirSync(contractsDir, { recursive: true });

  fs.writeFileSync(
    path.join(contractsDir, "contract-addresses.json"),
    JSON.stringify({
      AgentRegistry: await registry.getAddress(),
      TaskMarketplace: await marketplace.getAddress(),
    }, null, 2)
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
