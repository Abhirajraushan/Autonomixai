// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract TaskMarketplace {
    struct Task {
        uint256 id;
        string description;
        uint256 reward;
        address creator;
        address executor;
        bool isCompleted;
    }

    Task[] public tasks;
    mapping(address => uint256[]) public creatorTasks;
    mapping(address => uint256[]) public executorTasks;

    event TaskCreated(uint256 indexed id, string description);
    event TaskCompleted(uint256 indexed id, address executor);

    // ✅ Accept ETH while creating task
    function createTask(string memory _description, uint256 _reward) public payable {
        require(msg.value == _reward, "Sent value must match reward");

        uint256 newTaskId = tasks.length;
        tasks.push(Task(newTaskId, _description, _reward, msg.sender, address(0), false));
        creatorTasks[msg.sender].push(newTaskId);
        emit TaskCreated(newTaskId, _description);
    }

    // ✅ Reward executor on task completion
    function completeTask(uint256 _taskId) public payable {
        Task storage task = tasks[_taskId];
        require(!task.isCompleted, "Task already completed");
        require(address(this).balance >= task.reward, "Insufficient contract balance");

        task.isCompleted = true;
        task.executor = msg.sender;
        executorTasks[msg.sender].push(_taskId);
        payable(msg.sender).transfer(task.reward);
        emit TaskCompleted(_taskId, msg.sender);
    }

    function getTaskCount() public view returns (uint256) {
        return tasks.length;
    }

    // ✅ Allow ETH to be received
    receive() external payable {}
}
