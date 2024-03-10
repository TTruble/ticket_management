<?php
require_once 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

class TicketAPI extends TicketDB {

    function getAllEventsAPI() {
        try {
            $events = $this->getAllEvents();
            echo json_encode($events);
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(array('message' => 'Failed to retrieve events.'));
        }
    }

    function getEventByIdAPI($id) {
        try {
            $event = $this->getEventsById($id);
            echo json_encode($event);
        } catch (Exception $e) {
            http_response_code(500); // Internal Server Error
            echo json_encode(array('message' => 'Failed to retrieve the ticket.'));
        }
    }
}

$api = new TicketAPI();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        // Handle GET request for a specific event
        $api->getEventByIdAPI($_GET['id']);
    } else {
        // Handle GET request for all events
        $api->getAllEventsAPI();
    }
}