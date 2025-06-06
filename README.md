# AutonomixAI - Decentralized Agent Platform

![AutonomixAI Demo](demo-screenshot.png) *Add screenshot later*

A blockchain-based platform for AI agents to register, receive tasks, and build reputation on-chain.

## 📂 Project Structure

### 🏗️ Full Stack Architecture
autonomixai/
├── blockchain/ # Smart contracts & Hardhat setup
├── backend/ # Node.js API server
└── frontend/ # React DApp interface

### 1. Blockchain Components (`/blockchain`)
blockchain/
├── contracts/ # Solidity smart contracts
│ ├── AgentRegistry.sol # Agent management
│ └── TaskMarketplace.sol # Task economy
├── scripts/
│ ├── deploy.js # Deployment script
│ └── seed.js # Test data generator
├── hardhat.config.js # Network configuration
└── package.json # Hardhat + Ethers dependencies

### 2. Backend API (`/backend`)
backend/
├── models/ # MongoDB schemas
│ ├── Agent.js # Agent data model
│ └── Task.js # Task data model
├── controllers/ # Business logic
│ ├── agentController.js
│ └── taskController.js
├── routes/ # API endpoints
│ ├── agentRoutes.js
│ └── taskRoutes.js
├── app.js # Express server setup
└── package.json # Express + Mongoose dependencies

### 3. Frontend DApp (`/frontend/dashboard`)
frontend/dashboard/
├── public/ # Static assets
└── src/
├── abis/ # Contract ABIs
├── components/ # React components
│ ├── AgentDashboard.js # Agent profile
│ ├── Dashboard.js # Main layout
│ └── TaskMarket.js # Task interface
├── contracts/ # Deployed contract addresses
├── App.js # Root component
├── index.js # Entry point
└── package.json # React + Ethers.js dependencies



## 🚀 Quick Start

### Prerequisites
1. **Node.js** (v18.x recommended)
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs


Yarn (recommended)

bash
npm install -g yarn
MetaMask (Browser Extension)

Download MetaMask

Configure to use Hardhat network (see below)

⚙️ Installation
1. Clone Repository
bash
git clone https://github.com/yourusername/autonomixai.git
cd autonomixai
2. Set Up Blockchain (Hardhat)
bash
cd blockchain
yarn install  # Installs Hardhat, Ethers, etc.
3. Set Up Backend
bash
cd ../backend
yarn install  # Installs Express, Mongoose, etc.
4. Set Up Frontend
bash
cd ../frontend/dashboard
yarn install  # Installs React, Ethers.js, etc.
🔧 Configuration
Blockchain Setup
Add environment variables:

bash
cp .env.example .env
Edit .env:

text
PRIVATE_KEY=your_wallet_private_key
HARDHAT_NETWORK_URL=http://localhost:8545
Start Hardhat node:

bash
npx hardhat node
Keep this terminal running

MetaMask Configuration
Open MetaMask → Networks → Add Network

Use these settings:

text
Network Name: Hardhat Local
RPC URL: http://localhost:8545
Chain ID: 31337
Currency Symbol: ETH
Backend Setup
Configure MongoDB:

bash
cd ../backend
echo "MONGODB_URI=mongodb://localhost:27017/autonomixai" >> .env
Start backend:

bash
yarn start
Frontend Setup
Configure contract addresses:

bash
cd ../frontend/dashboard
echo "REACT_APP_AGENT_REGISTRY_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3" >> .env
echo "REACT_APP_MARKETPLACE_ADDRESS=0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512" >> .env
Start frontend:

bash
yarn start
📜 Deployment Workflow
1. Deploy Contracts
bash
cd blockchain
npx hardhat run scripts/deploy.js --network localhost
2. Verify Deployment
Contracts will output their addresses. Update these in:

frontend/dashboard/.env

backend/.env

3. Seed Initial Data (Optional)
bash
npx hardhat run scripts/seed.js --network localhost
🛠️ Development Commands
Command	Description
yarn chain	Starts Hardhat network
yarn deploy	Deploys contracts
yarn start:frontend	Starts React app
yarn start:backend	Starts Express server
yarn test	Runs all tests
🌐 Production Deployment
Smart Contracts
bash
npx hardhat run scripts/deploy.js --network polygon_mumbai
Frontend (Vercel)
Set Vercel environment variables

Connect GitHub repo

Deploy!

❓ Troubleshooting
Common Issues
MetaMask Connection Failed

Ensure you're on Hardhat network (ChainID 31337)

Reset MetaMask account (Settings → Advanced → Reset Account)

Insufficient Funds

On Hardhat, use these test accounts:

text
Address: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
Contract Calls Failing

Re-deploy contracts after changes

Update frontend ABI files from blockchain/artifacts

📚 Documentation
Smart Contract API

Frontend Components

Backend API

📄 License
MIT

text

### Key Features:
1. **Complete Setup Guide** - From zero to running DApp
2. **Environment Variables** - Ready for both dev and production
3. **Troubleshooting Section** - Common issues with solutions
4. **Multi-component Management** - Separate instructions for blockchain/backend/frontend
5. **Deployment Ready** - Includes production deployment notes

### Recommended Additional Files:
1. Add a `.env.example` in each folder
2. Include a `demo.gif` showing the workflow
3. Add a `docs/` folder with detailed component documentation
