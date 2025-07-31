let mongoose=require("mongoose");

let Schema=mongoose.Schema;

let taskSchema=new Schema({
    name:{
        type:String,
        required:true
    }
})

let taskModel=mongoose.model("Task",taskSchema);

module.exports=taskModel;