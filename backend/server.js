const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const cors = require("cors");
const Organiser = require('./Models/OrgansierSchema.js');

const {signupValidation , LoginValidation} = require('./Middleware/AuthValidation.js');
const connectionWithDB = require('./Models/DB.js');
connectionWithDB();
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
// Event Schema
const eventSchema = new mongoose.Schema({
  name: String,
  date: String,
  price: String,
  description: String,
});

const Event = mongoose.model("Event", eventSchema);

// Ticket Schema
const ticketSchema = new mongoose.Schema({
  eventId: String,
  userName: String,
  userEmail: String,
});

const Ticket = mongoose.model("Ticket", ticketSchema);

// Add Event
app.post("/add-event", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All Events
app.get("/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Book Ticket
app.post("/book-ticket", async (req, res) => {
  try {
    const ticket = new Ticket(req.body);
    await ticket.save();
    res.status(201).send(ticket);
  } catch (error) {
    res.status(400).send(error);
  }
});
const jwt = require('jsonwebtoken');
const farmer = require("./Models/farmerschema.js");


app.use(express.json());

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.get("/", (req, res) => { 
    res.send("hello from backend");
})

app.post("/Organiser-Login" ,LoginValidation, async(req , res) => {
  try{
      const { password , email  } = req.body;
      const user = await Organiser.findOne({email});
      const errormsg  = "Auth failed or password is wrong !";
      if(!user){
          return res.status(403)
          .json({message : errormsg , success : false})
      }
      const ispassword = await bcrypt.compare(password , user.password);
      if(!ispassword){
          return res.status(403)
          .json({message : errormsg , success : false})
      }

     
      const jwtoken = jwt.sign(
          {email : user.email  , _id : user._id},
          process.env.JWT_SECRET,
          { expiresIn : '24h'}
      )
      
       res.status(200).
      json({message : "Login successfully", success : true , jwtoken  , email , name : user.name})
  }
  catch(error){
      console.log(error);
      res.status(500).
      json({message : "Internal server error " ,  success : false})
  }
})

app.post("/Organiser-Signup" ,signupValidation, async(req , res) => {
  try{
      const {name ,   password , email    } = req.body;
      const user = await Organiser.findOne({email});
      if(user){
          return res.status(409)
          .json({message : "User is already exist , you can login" , success : false})
      } 
      const hashedPassword = await bcrypt.hash(password, 10);
const userModel = new Organiser({ name, email, password: hashedPassword });
await userModel.save();
      res.status(201).
      json({message : "Signup successfully", success : true})
  }
  catch(error){
      console.log(error);
      res.status(500).
      json({message : "Internal server error " ,  success : false })
  }
})


app.post("/Signup" ,signupValidation, async(req , res) => {
    try{
        const {name ,   password , email    } = req.body;
        const user = await farmer.findOne({email});
        if(user){
            return res.status(409)
            .json({message : "User is already exist , you can login" , success : false})
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
const userModel = new farmer({ name, email, password: hashedPassword });
await userModel.save();
        res.status(201).
        json({message : "Signup successfully", success : true})
    }
    catch(error){
        console.log(error);
        res.status(500).
        json({message : "Internal server error " ,  success : false })
    }
})


app.post("/Login" ,LoginValidation, async(req , res) => {
    try{
        const { password , email  } = req.body;
        const user = await farmer.findOne({email});
        const errormsg  = "Auth failed or password is wrong !";
        if(!user){
            return res.status(403)
            .json({message : errormsg , success : false})
        }
        const ispassword = await bcrypt.compare(password , user.password);
        if(!ispassword){
            return res.status(403)
            .json({message : errormsg , success : false})
        }

       
        const jwtoken = jwt.sign(
            {email : user.email  , _id : user._id},
            process.env.JWT_SECRET,
            { expiresIn : '24h'}
        )
        
         res.status(200).
        json({message : "Login successfully", success : true , jwtoken  , email , name : user.name})
    }
    catch(error){
        console.log(error);
        res.status(500).
        json({message : "Internal server error " ,  success : false})
    }
})

// Start Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
