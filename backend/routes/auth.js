const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/user")

router.post("/register",async(req,res)=>{
    const {email,password,role} = req.body;
    const hashedpassword = await bcrypt.hash(password,10);
    const user = new User({email, password: hashedpassword,role});
    await user.save();
    res.json({message:"User registered successfully"})
});

router.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    const user =await User.findOne({email});
    if(!user) return res.status(400).json({message :"Invalid credentials"});
    const isMatched = await bcrypt.compare(password,user.password);
    if(!isMatched) return res.status(400).json({message:"Wrong password"})
    const token = jwt.sign({id: user._id,role:user.role},process.env.JWT_SECRET,{
        expiresIn:"7d"
    });
    res.json({token,user:{
        id:user._id,
        email:user.email,
        role:user.role
    }})
})
module.exports = router;