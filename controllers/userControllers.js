import User from '../models/userSchema.js';
import bcrypt from 'bcrypt' 
export const loginPost = async (req, res) => {
  try {
    console.log('To Do Login Section');
    console.log(req.body);
    return res.json(req.body);
  } catch (error) {
    console.error('Error from login post page');
  }
};

export const signupPost = async (req, res) => {
  try {
    console.log('To Do signup Section');
    console.log(req.body);
    let { name, password, mail } = req.body;
     const existing=await User.findOne({mail:mail})
     if(existing){
        console.log("mail exist");
       return res.json({mailExists:true})
     }else{
         password = await bcrypt.hash(password, 10)
        const user = new User({
            name,
            password,
            mail,
          });
          const result = await user.save();
          console.log("Registered",result);
          return res.json({registered:true,result});
     }
   
  } catch (error) {
    console.error('Error from signup post page',error);
  }
};
