// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.0;

contract AgentRegistry {
    event AgentRegistered(address indexed agent, string name);
    
    struct Agent {
        string name;
        address walletAddress;
        uint reputation;
    }

    mapping(address => Agent) public agents;

    function register(string memory _name) public {
    require(bytes(_name).length >= 3, "Name too short");
    require(bytes(_name).length <= 20, "Name too long");
    require(agents[msg.sender].walletAddress == address(0), "Already registered");
    agents[msg.sender] = Agent(_name, msg.sender, 100);
    emit AgentRegistered(msg.sender, _name);
}
}
