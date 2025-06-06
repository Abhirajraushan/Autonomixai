# AutonomixAI - Decentralized Agent Platform  
![Project Architecture](Screenshot_2025-06-06_172825.png)  

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
```bash
# Terminal 1 - Blockchain (Hardhat)
cd blockchain
npx hardhat node

# Terminal 2 - Backend (Node.js)
cd ../backend
npm start

# Terminal 3 - Frontend (React)
cd ../frontend/dashboard
npm start
```

## 🔧 Configuration Files
1. **Hardhat Setup** (`blockchain/.env`)
   ```
   PRIVATE_KEY=your_wallet_key
   HARDHAT_NETWORK_URL=http://localhost:8545
   ```

2. **Backend Setup** (`backend/.env`)
   ```
   MONGODB_URI=mongodb://localhost:27017/autonomixai
   AGENT_REGISTRY_ADDRESS=0x5FbDB...
   ```

3. **Frontend Setup** (`frontend/dashboard/.env`)
   ```
   REACT_APP_AGENT_REGISTRY_ADDRESS=0x5FbDB...
   REACT_APP_MARKETPLACE_ADDRESS=0xe7f17...
   ```

## 🚨 Troubleshooting
| Issue | Solution |
|-------|----------|
| Contracts not deploying | Delete `blockchain/artifacts` and redeploy |
| MetaMask connection errors | Switch to Hardhat Network (ChainID: 31337) |
| MongoDB connection failed | Ensure `mongod` service is running |

## 📜 License
MIT License - Open Source
