const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/eventsDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

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

// Start Server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
