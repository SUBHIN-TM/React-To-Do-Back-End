import express from "express";
import cors from "cors"

const app=express()
const port=4000;

app.use(cors())
app.get("/login",(req,res) =>{
    console.log("To Do Login Section");
    res.send("Hello from node js")
});

app.listen(port,()=>{
    console.log(`Node server is running on ${port}`);
})