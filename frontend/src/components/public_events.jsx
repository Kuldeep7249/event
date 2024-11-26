import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/public_events.module.css";

const Public_events = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [bookingDetails, setBookingDetails] = useState({
    userName: "",
    userEmail: "",
  });

  // Fetch events
  useEffect(() => {
    axios.get("http://localhost:5000/events").then((res) => setEvents(res.data));
  }, []);

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
      <h1 className="h1Tag">Available Events</h1>

      {/* Events List */}
      <div className={styles.body}>
        {events.length > 0 ? (
          events.map((event) => (
            <div
              key={event._id}
              className={styles.events_item}
              onClick={() => setSelectedEvent(event)}
            >
              <h3>{event.name}</h3>
              <p>Date: {new Date(event.date).toLocaleDateString()}</p>
              <p>Price: {event.price}</p>
              <p>{event.description}</p>
            </div>
          ))
        ) : (
          <p>No events available at the moment.</p>
        )}
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
          <button onClick={() => setSelectedEvent(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Public_events;
