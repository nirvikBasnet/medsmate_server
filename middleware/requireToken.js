const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');
// const {jwtkey} = require('../keys')

const dotenv = require('dotenv').config();
const jwtkey = process.env.JWT_KEY;


module.exports = (req,res,next) => {
    const { authorization } = req.headers;

    if(!authorization){
        return res.status(401).send({error:"You Must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,jwtkey,async (err,payload)=>{
        if(err){
            return res.status(401).send({error:"You Token is Wrong"})
        }

    const {userId} = payload;
    const user = await User.findById(userId)
    req.user = user;
    
    next();

    })

}