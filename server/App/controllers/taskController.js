let taskModel=require("../models/todo.model");

let taskInsert=(req,res)=>{
    let {name} = req.body;
    let task=new taskModel({
        name
    })
    task.save().then(()=>{
        res.send({status:1,message:"Task saved successfully"});
    }).catch((err)=>{
        res.send({status:0,message:"Task saving unsuccessfull",error:err.message});
    })
}

let taskList=async(req,res)=>{
    try {
        let task=await taskModel.find();
        res.send({
            status:1,
            taskList:task
        })
    } catch (err) {
        res.send({
            status:0,
            message:"Failed to fetch tasks",
            error:err.message
        })
    }
}

let taskDelete=async(req,res)=>{
    try {
        let taskId=req.params.id;
        let task=await taskModel.deleteOne({_id:taskId});

        res.send({
            status:1,
            message:"Task Delete Successfully",
            TaskDeleted:task
        })
    } catch (err) {
        res.send({
            status:0,
            message:"Failed to delete task",
            error:err.message
        })
    }
}

module.exports={taskInsert,taskList,taskDelete};