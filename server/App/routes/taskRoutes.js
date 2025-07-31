let express=require("express");

const {taskInsert,taskList,taskDelete} = require("../controllers/taskController");

let taskRouter=express.Router();

taskRouter.post("/insert",taskInsert);
taskRouter.get("/list",taskList);
taskRouter.delete("/delete/:id",taskDelete);

module.exports={taskRouter};
