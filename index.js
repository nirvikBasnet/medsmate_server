const dotenv = require('dotenv').config();
const express = require('express')
const bodyParser = require ('body-parser')
const mongoose = require('mongoose')
const app= express()
const PORT = 3000

const connectionString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@backpack-tf-db.wfvcq.mongodb.net/MedsMate?retryWrites=true&w=majority`


require('./models/User');

//all routes goes below
const authRoutes = require('./routes/authRoutes')
const medsRouter = require('./routes/meds');
const requireToken = require('./middleware/requireToken')


app.use(bodyParser.json())
app.use('/meds', medsRouter);
app.use(authRoutes)

mongoose.connect(connectionString,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
) 
//connecting to mongodb
mongoose.connection.on('connected',()=>{
    console.log("connected to mongo")
   
})

mongoose.connection.on('error',()=>{
    console.log("cannot connect to mongo",err)
})


app.get('/',requireToken,(req,res)=>{
    res.send({email: req.user.email})
})

app.listen(PORT,()=>{
    console.log("server runing in " + PORT)
})