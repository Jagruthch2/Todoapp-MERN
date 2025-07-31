import './App.css'
import List from './components/List'
import AddTodo from './components/AddTodo'
import {useState} from 'react'
import axios from 'axios'

function App() {
  const [taskList,setTaskList]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  let getAllTasks=()=>{
    setIsLoading(true);
    axios.get("http://localhost:7000/todo/list").then((res)=>{
      return res.data;
    }).then((finalData)=>{
      if(finalData.status){
          setTaskList(finalData.taskList)
      }
    }).catch((error) => {
      console.error('Error fetching tasks:', error);
    }).finally(() => {
      setIsLoading(false);
    })
  }

  let deleteTask=(taskId)=>{
    axios.delete(`http://localhost:7000/todo/delete/${taskId}`).then((res)=>{
      console.log('Task deleted:', res.data);
      getAllTasks(); // Refresh the list after deleting
    }).catch((error) => {
      console.error('Error deleting task:', error);
    })
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 min-h-screen py-4 px-4 sm:py-8">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-2xl bg-white/10 backdrop-blur-lg text-center mx-auto p-4 sm:p-6 rounded-xl shadow-2xl border border-white/20">
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                ToDo List
              </h1>
              <div className="space-y-4 sm:space-y-6">
                <AddTodo getAllTasks={getAllTasks} isLoading={isLoading}/>
                <List getAllTasks={getAllTasks} taskList={taskList} deleteTask={deleteTask} isLoading={isLoading}/>
              </div>
          </div>
      </div>
    </>
  )
}

export default App
