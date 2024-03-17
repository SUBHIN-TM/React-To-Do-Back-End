import User from '../models/userSchema.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import env from "dotenv"
env.config()

export const loginPost = async (req, res) => {
  try {
    console.log('To Do Login Section');
    console.log(req.body);
    const mail = req.body.name
    const password = req.body.password
    const existing = await User.findOne({ mail: mail })
   
    if (!existing) {
      return res.json({ invalidUser: true })
    }
    const passwordMatch = await bcrypt.compare(password, existing.password)
    if (!passwordMatch) {
      return res.json({ passwordMissmatch: true })
    } else {
      console.log(existing);
       const payload={id:existing._id,name:existing.name,mail:existing.mail}
       let key=process.env.JWT_KEY
     let token=  jwt.sign(payload,key,{expiresIn:'24h'})
      // console.log(token);
      return res.json({ dashboard: true ,token});
    }
  } catch (error) {
    console.error('Error from login post page');
  }
};

export const signupPost = async (req, res) => {
  try {
    console.log('To Do signup Section');
    console.log(req.body);
    let { name, password, mail } = req.body;
    const existing = await User.findOne({ mail: mail })
    if (existing) {
      console.log("mail exist");
      return res.json({ mailExists: true })
    } else {
      password = await bcrypt.hash(password, 10)
      const user = new User({
        name,
        password,
        mail,
      });
      const result = await user.save();
      console.log("Registered", result);
      return res.json({ registered: true, result });
    }

  } catch (error) {
    console.error('Error from signup post page', error);
  }
};


export const dashboardGet = async (req, res) => {
  try {
    console.log("Dashboard");
    // console.log(req.token);
    const {datas}=await User.findOne({mail:req.token.mail})
    // console.log(datas);
    return res.json({ success: true,name:req.token.name,datas })
  } catch (error) {
    console.error('Error from dashboardGet page', error);
  }
}

export const addTask = async (req, res) => {
  try {
    console.log("Task adding section ");
    const { date, task, status } = req.body.newTaskObjetc
     console.log(date, task, status);
    let addedTask={
      task:task,
      status:status,
      date:date
    }
    const taskAdded=await User.updateOne({mail:req.token.mail},{$push:{'datas':addedTask}})
    console.log(taskAdded);
    if(taskAdded.modifiedCount >0){
      return res.status(200).json({added:true})
    }

  } catch (error) {
    console.error('Error from addTask page', error);
  }
}


export const deleteTask=async(req,res) =>{
try {
  const userId=req.token.id;
  const taskId=req.params.id;
  
  let response=await User.findOneAndUpdate(
    {_id:userId},
    {$pull :{datas:{_id:taskId}}},
    {new:true} 
    );
    if(!response){
      return res.status(400).json({failed:true})
    }else{
      return res.status(200).json({message:'Successfully Deleted'})
    }
   

} catch (error) {
  console.error('Error from deleteTask page', error);
  return res.status(500).json({message:'internal server error '})
}
}


export const editTask=async(req,res)=>{
  try {
    console.log("edit section");
    const taskId=req.params.id
    const data=req.body.modifiedAndMerged
    const userId=req.token.id
   console.log( taskId,data,userId);
   const result=await User.findOneAndUpdate(
    {_id:userId,"datas._id":taskId},
    {$set: {"datas.$":data}},
    {new:true}
   )
  //  console.log(result);
  if(!result){
    return res.status(400).json({message:"cant perform edit  now"})
  }else{
    return res.status(200).json({message:"Successfully Updated"})
  }
  } catch (error) {
    console.error('Error from edit task page', error);
    return res.status(500).json({message:'internal server error '})
  }
}