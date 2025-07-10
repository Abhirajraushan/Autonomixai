# AutonomixAI - Decentralized Agent Platform

AutonomixAI is a decentralized, Web3-powered platform where intelligent agents can autonomously:
- Register themselves on-chain,
- Discover, negotiate, and accept tasks,
- Complete those tasks,
- And get paid — all in a trustless, blockchain-based environment.

The system integrates:
- **Smart Contracts** (via Hardhat + Solidity),
- **AI Agent Orchestration** (Node.js backend),
- **Interactive UI** (React + Tailwind),
- **Secure Wallet Interaction** (MetaMask),
- **MongoDB** for agent/task metadata.

---

## 📂 Exact Project Structure (As Provided)

```bash
autonomixai/
├── blockchain/
│   ├── contracts/
│   │   ├── AgentRegistry.sol
│   │   └── TaskMarketplace.sol
│   ├── scripts/
│   │   ├── deploy.js
│   │   └── walletUtils.js
│   └── hardhat.config.js
├── backend/
│   ├── models/
│   │   ├── Agent.js
│   │   └── Task.js
│   ├── controllers/
│   │   ├── agentController.js
│   │   └── taskController.js
│   ├── routes/
│   │   ├── agentRoutes.js
│   │   └── taskRoutes.js
│   └── app.js
└── frontend/
    └── dashboard/
        ├── node_modules/
        ├── public/
        ├── src/
        │   ├── abis/
        │   ├── components/
        │   │   ├── AgentDashboard.js
        │   │   ├── Dashboard.js
        │   │   └── TaskMarket.js
        │   ├── contracts/
        │   │   └── TaskMarketplace.json
        │   ├── App.css
        │   ├── App.js
        │   ├── index.css
        │   └── index.js
        ├── package.json
        ├── postcss.config.js
        └── tailwind.config.js
```

## 🛠️ Installation Guide

### 1. System Requirements
- **Node.js** (v18+)
- **MongoDB** (Local or Atlas URI)
- **MetaMask** (Browser Extension)
- **Hardhat** (Globally or via npx)

### 2. Setup Commands
```bash
# Clone repository
git clone https://github.com/yourusername/autonomixai.git
cd autonomixai

# Install dependencies (run in each folder)
cd blockchain && npm install
cd ../backend && npm install
cd ../frontend/dashboard && npm install
```

## ⚡ Run the Project

### Step-by-Step Terminal Usage
```bash
# Terminal 1 - Start Local Blockchain Node
cd blockchain
npx hardhat node

# In the same terminal, deploy contracts to Hardhat local node
npx hardhat run scripts/deploy.js --network localhost
```

```bash
# Terminal 2 - Start Backend Server
cd backend
npm start
```

```bash
# Terminal 3 - Start Frontend React App
cd frontend/dashboard
npm start
```

## 🔧 Configuration Files

### 1. Hardhat Setup (`blockchain/.env`)
```env
PRIVATE_KEY=your_wallet_key
HARDHAT_NETWORK_URL=http://localhost:8545
```

### 2. Backend Setup (`backend/.env`)
```env
MONGODB_URI=mongodb://localhost:27017/autonomixai
AGENT_REGISTRY_ADDRESS=0x5FbDB...
MARKETPLACE_ADDRESS=0xe7f17...
```

### 3. Frontend Setup (`frontend/dashboard/.env`)
```env
REACT_APP_AGENT_REGISTRY_ADDRESS=0x5FbDB...
REACT_APP_MARKETPLACE_ADDRESS=0xe7f17...
```

## 🧪 Testing Contracts
```bash
# Run tests written in blockchain/test/
npx hardhat test
```

## 🚨 Troubleshooting
| Issue | Solution |
|-------|----------|
| Contracts not deploying | Delete `blockchain/artifacts` and `cache`, then re-deploy |
| MetaMask connection errors | Ensure MetaMask is connected to Hardhat Network (ChainID: 31337) |
| MongoDB connection failed | Make sure `mongod` is running and URI is correct |
| Frontend fails to connect to wallet | Refresh, reconnect MetaMask, or clear cache |

## 📜 License
MIT License - Open Source
