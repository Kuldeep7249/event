import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Events.module.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    price: "",
    description: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    userName: "",
    userEmail: "",
  });

  // Fetch events
  useEffect(() => {
    axios.get("http://localhost:5000/events").then((res) => setEvents(res.data));
  }, []);

  // Handle Add Event
  const handleAddEvent = () => {
    axios.post("http://localhost:5000/add-event", newEvent).then((res) => {
      setEvents([...events, res.data]);
      setShowAddEventForm(false);
    });
  };

  // Handle Booking
  const handleBookTicket = () => {
    axios
      .post("http://localhost:5000/book-ticket", {
        eventId: selectedEvent._id,
        ...bookingDetails,
      })
      .then(() => {
        alert("Ticket booked successfully!");
        setSelectedEvent(null);
      });
  };

  return (
    <div className={styles.container}>
      <h1 className="h1Tag">Events</h1>
      <button
        className={styles.addButton}
        onClick={() => setShowAddEventForm(true)}
      >
        Add Event
      </button>

      {/* Add Event Form */}
      {showAddEventForm && (
        <div className={styles.form}>
          <h2>Add Event</h2>
          <input
            type="text"
            placeholder="Event Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <input
            type="date"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price"
            value={newEvent.price}
            onChange={(e) => setNewEvent({ ...newEvent, price: e.target.value })}
          />
          <textarea
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) =>
              setNewEvent({ ...newEvent, description: e.target.value })
            }
          ></textarea>
          <button onClick={handleAddEvent}>Submit</button>
        </div>
      )}

      {/* Events List */}
      <div className={styles.body}>
        {events.map((event) => (
          <div
            key={event._id}
            className={styles.events_item}
            onClick={() => setSelectedEvent(event)}
          >
            <h3>{event.name}</h3>
            <p>{event.date}</p>
            <p>{event.price}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>

      {/* Booking Form */}
      {selectedEvent && (
        <div className={styles.form}>
          <h2>Book Ticket for {selectedEvent.name}</h2>
          <input
            type="text"
            placeholder="Your Name"
            value={bookingDetails.userName}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, userName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Your Email"
            value={bookingDetails.userEmail}
            onChange={(e) =>
              setBookingDetails({ ...bookingDetails, userEmail: e.target.value })
            }
          />
          <button onClick={handleBookTicket}>Book</button>
        </div>
      )}
    </div>
  );
};

export default Events;
