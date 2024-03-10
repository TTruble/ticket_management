<?php
require_once 'db.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

class TicketaddAPI extends TicketDB
{

    function addEvent($event)
    {
        $errors = [];
        // print_r($event);

        // Check 'name' field length
        if (!array_key_exists('name', $event) || @strlen($event['name']) == 0) {
            $errors['name'] = "Name field cannot be empty.";
            // echo "empty - " . $event['name'] " - ". strlen($event['name']);
        } elseif (@strlen($event['name']) > 255) {
            $errors['name'] = "Name field must be less than or equal to 255 characters.";
        }

        // Check 'description' field length
        if (!array_key_exists('description', $event) || @strlen($event['description']) == 0) {
            $errors['description'] = "Description field cannot be empty.";
        } elseif (@strlen($event['description']) > 2500) {
            $errors['description'] = "Description field must be less than or equal to 2500 characters.";
        }

        // Check 'image' field length
        if (!array_key_exists('image', $event) || @strlen($event['image']) == 0) {
            $errors['image'] = "image field cannot be empty.";
        } elseif (@strlen($event['image']) > 10000) {
            $errors['image'] = "Image field must be less than or equal to 10000 characters.";
        }

        // Check 'location' field length
        if (!array_key_exists('location', $event) || @strlen($event['location']) == 0) {
            $errors['location'] = "location field cannot be empty.";
        } elseif (@strlen($event['location']) > 100) {
            $errors['location'] = "Location field must be less than or equal to 100 characters.";
        }

        $validEventTypes = [1, 2, 3, 4]; // Valid event type IDs
        if (!array_key_exists('event_type_id', $event) || !in_array($event['event_type_id'], $validEventTypes)) {
            $errors['event_type_id'] = "Invalid event type.";
        }

        if (!array_key_exists('datetime', $event)) {
            $errors['datetime'] = "datetime field is required.";
        } elseif (strtotime($event['datetime']) < strtotime(date('D M d, Y G:i'))) {
        }

        // print_r($errors);

        if (!empty($errors)) {
            http_response_code(500); // Internal Server Error
            return json_encode($errors);
        }

        return json_encode($this->insertTable($event, 'events'));
    }
}


$api = new TicketaddAPI();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Check if the request method is POST and handle accordingly
    $requestData = json_decode(file_get_contents('php://input'), true);
    echo $api->addEvent($requestData);
}
