import User from '../models/userSchema.js';
import bcrypt from 'bcrypt' 
export const loginPost = async (req, res) => {
  try {
    console.log('To Do Login Section');
    console.log(req.body);
    const mail=req.body.name
    const password=req.body.password
    const existing=await User.findOne({mail:mail})
    console.log(existing);
    if(!existing){
    return res.json({invalidUser:true})
    }
    const passwordMatch = await bcrypt.compare(password, existing.password)
    if(!passwordMatch){
      return res.json({passwordMissmatch:true})
    }else{
      return res.json({dashboard:true});
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


export const dashboardGet =async(req,res)=>{
  try {
      console.log("Dashboard");
      return res.json({success:true})
  } catch (error) {
    console.error('Error from dashboardGet page',error);
  }
}