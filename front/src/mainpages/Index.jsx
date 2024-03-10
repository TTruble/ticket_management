import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";
import AddTicketPopup from "./AddTicketPopup";

const Index = () => {
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const getEvents = async () => {
    const response = await fetch(
      "http://localhost/ticket_management/backend/ticket_api.php"
    );
    const events = await response.json();
    setEvents(events);
    console.log(events);
  };

  useEffect(() => {
    getEvents();
  }, []);

  const handleAddTicket = async () => {
    // Send formData to backend API to add ticket
    // After successful addition, close the popup and refresh events
    setShowPopup(false);
    await getEvents(); // You may need to handle errors here
  };

  return (
    <>
      <div className="body">
      
        {events.map((event) => (
          <div className="event" key={event.event_id}>
            <h2 className="eventname">{event.name}</h2>
            <img src={event.image} alt={event.name} />
            <p>Where - {event.location}</p>
            <Link className="button" to={`/eventinfo/${event.event_id}`}>
              More Info
            </Link>
          </div>
        ))}
      </div>
      <button className= "addticketbutton" onClick={() => setShowPopup(true)}>Add Event</button>
      {showPopup && (
        <AddTicketPopup onClose={() => setShowPopup(false)} onAddTicket={handleAddTicket} />
      )}
    </>
  );
};

export default Index;
