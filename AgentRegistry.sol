// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AgentRegistry {
    struct Agent {
        address wallet;
        string name;
        uint256 reputation;
    }

    mapping(address => Agent) private agents;
    address[] private agentList;

    event AgentRegistered(address indexed wallet, string name);
    event ReputationUpdated(address indexed wallet, uint256 newReputation);

    function registerAgent(string memory _name) public {
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(agents[msg.sender].wallet == address(0), "Already registered");

        agents[msg.sender] = Agent(msg.sender, _name, 100);
        agentList.push(msg.sender);

        emit AgentRegistered(msg.sender, _name);
    }

    function updateReputation(uint256 _newReputation) public {
        require(agents[msg.sender].wallet != address(0), "Not registered");
        agents[msg.sender].reputation = _newReputation;
        emit ReputationUpdated(msg.sender, _newReputation);
    }

    function getAgents() public view returns (Agent[] memory) {
        Agent[] memory allAgents = new Agent[](agentList.length);
        for (uint i = 0; i < agentList.length; i++) {
            allAgents[i] = agents[agentList[i]];
        }
        return allAgents;
    }

    function getAgent(address _agentAddress) public view returns (Agent memory) {
        require(agents[_agentAddress].wallet != address(0), "Agent not found");
        return agents[_agentAddress];
    }
}
