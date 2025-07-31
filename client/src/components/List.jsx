import React from 'react'
import axios from "axios"
import {useState,useEffect} from 'react'
export default function List({getAllTasks,taskList,deleteTask,isLoading}) {
  
    
  function displayList(){
        if (isLoading) {
          return (
            <div className="space-y-3">
              {[1,2,3].map(i => (
                <div key={i} className="bg-white/10 rounded-xl p-4 animate-pulse">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-white/20 rounded w-3/4"></div>
                    <div className="h-8 bg-white/20 rounded w-16"></div>
                  </div>
                </div>
              ))}
            </div>
          )
        }

        if (!taskList || taskList.length === 0) {
          return (
            <div className="text-center py-8 sm:py-12">
              <div className="text-4xl sm:text-6xl mb-4">📝</div>
              <p className="text-gray-300 text-base sm:text-lg">No tasks yet!</p>
              <p className="text-gray-400 text-sm sm:text-base">Add your first task above to get started.</p>
            </div>
          )
        }
        
        return taskList.map((item,id)=>{
            return (
              <div key={item.id || id} className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl p-3 sm:p-4 mb-3 transition-all duration-300 hover:bg-white/30 hover:scale-[1.02] hover:shadow-lg">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm sm:text-base font-medium truncate pr-2">
                      {item.name}
                    </p>
                  </div>
                  <button 
                    onClick={() => deleteTask(item.id || item._id)}
                    className="flex-shrink-0 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 active:scale-95 text-xs sm:text-sm shadow-md group-hover:shadow-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
        })
    }

  

  useEffect(()=>{
    getAllTasks();
  },[])
    
  return (
    <div className="w-full">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 sm:p-6 border border-white/20">
        <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 text-center">Your Tasks</h3>
        <div className="max-h-96 overflow-y-auto custom-scrollbar">
          {displayList()}
        </div>
        {taskList && taskList.length > 0 && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-gray-300 text-xs sm:text-sm text-center">
              {taskList.length} {taskList.length === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
