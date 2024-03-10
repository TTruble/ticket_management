import { useEffect, useState } from "react";
import "../index.css";
import { useParams } from "react-router-dom";
import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import QRCode from 'qrcode.react';

// Sample event data
const eventData = {
  eventName: "Sample Event",
  date: "March 10, 2024",
  venue: "Sample Venue",
  ticketCode: "ABC123" // Your ticket code
};

// Styles for PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  qrCode: {
    alignSelf: 'center',
    marginTop: 20
  }
});

const EventTicket = ({ eventData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Event: {eventData.eventName}</Text>
        <Text>Date: {eventData.date}</Text>
        <Text>Venue: {eventData.venue}</Text>
        <Text>Ticket Code: {eventData.ticketCode}</Text>
      </View>
      <View style={styles.section}>
        <QRCode value={eventData.ticketCode} size={100} style={styles.qrCode} />
      </View>
    </Page>
  </Document>
);

const downloadTicketPDF = (eventData) => {
  const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([<EventTicket eventData={eventData} />], { type: 'application/pdf' }));
    link.download = "ticket.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

const EventInfo = () => {
  const [event, setEvent] = useState([]);
  const {id} = useParams();

  const getEvent = async () => {
    const response = await fetch(
      `http://localhost/ticket_management/backend/ticket_api.php?id=${id}`
    );
    const event = await response.json();
    setEvent(event);
    console.log(event);
  };

  useEffect(() => {
    getEvent();
  }, []);
  async function buy() {
    console.log("works");
    const response = await fetch(
      `http://localhost/ticket_management/backend/ticketpurchase.php?event_id=${id}`
    );
    const result = await response.json();
  if (result) {
    // alert("ticket bought!");
    downloadTicketPDF({
      eventName: event.name,
  date: event.datetime,
  venue: event.location,
  ticketCode: result.ticketCode
    })
  } else {
    alert("failed!");
  }

  }

  return (
    <>
  

    <div className="body">
        <div className="event" key={event.event_id}>
          <h2 className="eventname">{event.name}</h2>
          <img src={event.image} />
          <p className="eventdesc">{event.description}</p>
          <p>Where - {event.location}</p>
          <button onClick={()=>buy()} className="PurchaseButton">buy</button>

        </div>
    </div>
    </>
  );
};

export default EventInfo;
