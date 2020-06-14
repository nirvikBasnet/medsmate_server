const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const {jwtkey} = require('../keys')

const router = express.Router();
const User = mongoose.model('User');



router.post('/signup',async (req,res)=>{
    //console.log(req.body)

   

    const {email,password} = req.body;

    try{

        const user = new User({email,password});

        await user.save();

        const token = jwt.sign({userId:user._id},jwtkey) //id from mongodb
        res.send({token})




        
    }catch(err){
       return res.status(422).send(err.message)
         
    }

    
})


//signin route

router.post('/signin',async(req,res)=>{
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(422).send({error : "Must provide email or password."})
    }
    const user =await User.findOne({email}) //it might take some time to find email.
    if(!user) {
        return res.status(422).send({error : "User not Found !!"})
    }
    try{
    await user.comparePassword(password);
    const token = jwt.sign({userId:user._id},jwtkey) //id from mongodb
    res.send({token})
    
    }catch{
        return res.status(422).send({error : "User not Found !!"})

    }

})


module.exports = router