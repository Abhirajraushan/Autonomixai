import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import marketplaceABI from '../contracts/TaskMarketplace.json';

export default function TaskMarket({ account }) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ description: '', reward: '' });
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [completingTask, setCompletingTask] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(
          process.env.REACT_APP_MARKETPLACE_ADDRESS,
          marketplaceABI.abi,
          signer
        );
        setContract(contract);
        await loadTasks(contract);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (account) initContract();
  }, [account]);

  const loadTasks = async (contract) => {
    try {
      setLoading(true);
      const taskCount = await contract.getTaskCount();
      const loadedTasks = [];
      
      for (let i = 0; i < taskCount; i++) {
        const task = await contract.tasks(i);
        loadedTasks.push({
          id: i,
          description: task.description,
          reward: ethers.formatEther(task.reward),
          creator: task.creator,
          executor: task.executor,
          isCompleted: task.isCompleted
        });
      }
      
      setTasks(loadedTasks);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async () => {
    try {
      if (!newTask.description || !newTask.reward) {
        throw new Error("Please fill all fields");
      }
      if (isNaN(newTask.reward) || Number(newTask.reward) <= 0) {
        throw new Error("Reward must be a positive number");
      }

      setIsCreating(true);
      const tx = await contract.createTask(
        newTask.description,
        ethers.parseEther(newTask.reward.toString()),
        { value: ethers.parseEther(newTask.reward.toString()) }
      );
      
      await tx.wait();
      await loadTasks(contract);
      setNewTask({ description: '', reward: '' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsCreating(false);
    }
  };

  const completeTask = async (taskId) => {
    try {
      setCompletingTask(taskId);
      const tx = await contract.completeTask(taskId);
      await tx.wait();
      await loadTasks(contract);
    } catch (err) {
      setError(err.message);
    } finally {
      setCompletingTask(null);
    }
  };

  if (loading) return (
    <div className="flex justify-center py-8">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Task Marketplace</h2>
      
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6 rounded-md">
          <p className="text-sm text-red-700">Error: {error}</p>
        </div>
      )}

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Create New Task</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={newTask.description}
            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
            placeholder="Task description"
          />
          <input
            type="number"
            className="p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={newTask.reward}
            onChange={(e) => setNewTask({...newTask, reward: e.target.value})}
            placeholder="Reward (ETH)"
            min="0.01"
            step="0.01"
          />
          <button 
            onClick={createTask}
            disabled={isCreating}
            className={`col-span-1 md:col-span-2 py-2 px-4 rounded-md font-medium ${
              isCreating
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isCreating ? 'Creating Task...' : 'Create Task'}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Available Tasks</h3>
        
        {tasks.length === 0 ? (
          <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No tasks yet</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by creating your first task
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map(task => (
              <div key={task.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800">{task.description}</h4>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm">
                      <span className="text-gray-600">
                        <span className="font-semibold">{task.reward} ETH</span> reward
                      </span>
                      <span className="text-gray-600">
                        Created by: {task.creator === account ? (
                          <span className="text-blue-600">You</span>
                        ) : (
                          <span className="font-mono">{`${task.creator.slice(0, 6)}...${task.creator.slice(-4)}`}</span>
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      task.isCompleted 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {task.isCompleted ? 'Completed' : 'Open'}
                    </span>
                  </div>
                </div>
                
                {!task.isCompleted && task.creator === account && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => completeTask(task.id)}
                      disabled={completingTask === task.id}
                      className={`px-3 py-1 rounded-md text-sm font-medium ${
                        completingTask === task.id
                          ? 'bg-gray-200 text-gray-600 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {completingTask === task.id ? 'Processing...' : 'Mark Complete'}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
