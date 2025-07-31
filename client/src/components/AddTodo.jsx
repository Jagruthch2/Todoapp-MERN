import React from 'react'
import {useState} from 'react'
import axios from 'axios'
export default function AddTodo({getAllTasks, isLoading}) {
  const [task,setTask]=useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd=()=>{
      if(task.trim() === '') return; // Don't add empty tasks
      
      setIsAdding(true);
      const taskData = {name: task};
      
      axios.post("http://localhost:7000/todo/insert", taskData).then((res)=>{
      console.log(res.data);
      setTask('');
      getAllTasks(); // Refresh the list after adding
    }).catch((error) => {
      console.error('Error adding task:', error);
    }).finally(() => {
      setIsAdding(false);
    })
  }

  return (
    <div className="bg-white/20 backdrop-blur-sm text-white p-4 sm:p-6 rounded-xl shadow-lg border border-white/30 w-full">
      <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-center">Add New Task</h3>

      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-200">Enter task name</label>
          <input
            className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-white/10 text-white border border-white/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent placeholder-gray-300 text-sm sm:text-base backdrop-blur-sm"
            type="text"
            placeholder="What needs to be done?"
            value={task}
            onChange={(e)=>setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          />
        </div>

        <button 
          onClick={handleAdd} 
          disabled={!task.trim() || isAdding}
          className="w-full px-4 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105 active:scale-95 text-sm sm:text-base shadow-lg"
        >
          {isAdding ? (
            <div className="flex items-center justify-center">
              <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Adding...
            </div>
          ) : (
            'Add Task'
          )}
        </button>
      </div>
    </div>
  );
}
