import User from '../models/userSchema.js';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

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
     let token=  jwt.sign(payload,"todosecret",{expiresIn:'24h'})
       console.log(token);
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
    return res.json({ success: true })
  } catch (error) {
    console.error('Error from dashboardGet page', error);
  }
}

export const addTask = async (req, res) => {
  try {
    console.log("Task adding section");
    const { date, task, status } = req.body.tasks
    console.log(date, task, status);

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

