import express, { json } from "express";
import cors from "cors"
import usersRouter from "./routers/users.js"

const app=express()
const port=4000;


app.use(express.json())
app.use(cors())
app.use('/',usersRouter)

app.listen(port,()=>{
    console.log(`Node server is running on ${port}`);
})