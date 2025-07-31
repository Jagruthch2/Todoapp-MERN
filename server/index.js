let express=require("express");
let mongoose=require("mongoose");
let cors=require("cors");
const {taskRouter}=require("./App/routes/taskRoutes");
require("dotenv").config()
let app=express()


app.use(express.json())
app.use(cors())


app.use("/todo",taskRouter);

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Connected to MongoDB")
    app.listen(process.env.PORT||3000,()=>{
        console.log("Server is running")
    })
}).catch((err)=>{
    console.log(err);
})