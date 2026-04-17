import User from '../models/User.js';  //to verfy the user login credentials we need to check the credentials first, Soimporting him first
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = async(req, res)=>{
    try{
        //taking the email, password from the user
        const {email,password} = req.body 

        //finding the user with the entered mail
        const user = await User.findOne({email})

        //If user not found with that mail
        if(!user){
            return res.status(404).json({success:false, error:"User not Found"})
        }

        //If found check for the password match
        const isMatchPassword = await bcrypt.compare(password, user.password)

        //If password is not matched
        if(!isMatchPassword){
            return res.status(401).json({success:false, error:"Invalid Credentials"})
        }

        const token = jwt.sign({_id: user._id, role: user.role},
            process.env.JWT_KEY, {expiresIn: "10d"}
        )

        return res
            .status(200)
            .json({
                success: true,
                token,
                user: {_id: user._id, name: user.name, role: user.role}
            })

    }catch(error){
        res.status(500).json({success: false, error: error.message})
    }
};

const verify = (req,res)=>{
    return res.status(200).json({success: true, user: req.user})
}

export {login,verify}
