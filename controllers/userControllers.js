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
    const { date, task, status } = req.body.tasks
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


export const logout = async (req, res) => {
  try {
    console.log("Logout  section");
  

  } catch (error) {
    console.error('Error from logout page', error);
  }

}

