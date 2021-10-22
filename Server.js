const mongoose = require('mongoose');
const express = require('express');
const app = express();

const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config({path:"./config/.env"});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    dbName : "mongoose",
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}).then(()=>{
    console.log("db connected")
}).catch(() => {
    console.error("Failed Connection");
  });

  app.listen(5000, (err) => {
    if (err) {
      throw err;
    } else {
      console.log("server is up and running on port 5000");
    }
  });

  
  app.get("/getUser", (req,res)=>{
      User.find().then((users)=>res.send(users)).catch((err)=>console.log(err.message))
  });

  app.post('/sendUser', (req,res)=>{
            const {fullName, email, password, phone} = req.body;
            var newUser = new User({
              fullName,
              email,
              password,
              phone,
            });
            newUser.save().then(()=>res.send(req.body)).catch((err) => console.error(err.message))

  });
  
  app.put("/putUser/:id", (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body)
      .then(res.send(req.body))
      .catch((err) => console.error(err.message));
  });
  
  app.delete("/deleteUser/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then(res.send("User Deleted"))
      .catch((err) => console.error(err.message));
  });