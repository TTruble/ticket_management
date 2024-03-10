import React, { useState } from "react";
import "../index.css";

const AddTicketPopup = ({ onClose, onAddTicket }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    location: "",
    event_type_id: "1", // Default value for event type
    datetime: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    description: "",
    image: "",
    location: "",
    event_type_id: "",
    datetime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  console.log(errors);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost/ticket_management/backend/ticketadd_api.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
    //   const test = response;
    //   const testjson = await test.json();
    //   console.log("response:", testjson);
      if (response.ok) {
        // If insertion is successful, refresh events or perform necessary actions
        await onAddTicket();
        onClose(); // Close the popup
      } else {
        const errorData = await response.json();
        setErrors(errorData);
        // Handle errors, maybe display them to the user
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        <h2>Add Event</h2>
        <form className="inputfields" onSubmit={handleSubmit}>
          <label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors?.name};
          </label>
          <label>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors?.description}
          </label>
          <label>
            <input
              type="text"
              name="image"
              placeholder="Image URL"
              value={formData.image}
              onChange={handleChange}
            />
            {errors?.image}
          </label>
          <label>
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
            />
            {errors?.location}
          </label>
          <label>
            <select
              name="event_type_id"
              value={formData.event_type_id}
              onChange={handleChange}
            >
              <option value="1">Koncert</option>
              <option value="2">Convention</option>
              <option value="3">Movie</option>
              <option value="4">Party</option>
            </select>
            {errors?.event_type_id}
          </label>
          <label>
            <input
              type="datetime-local"
              name="datetime"
              value={formData.datetime}
              onChange={handleChange}
            />
            {errors?.datetime}
          </label>
          <button type="submit">Add Ticket</button>
        </form>
      </div>
    </div>
  );
};

export default AddTicketPopup;
