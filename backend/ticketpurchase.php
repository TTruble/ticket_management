<?php
include_once "db.php";


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

class TicketPurchase extends TicketDB
{

    function buyticket($event_id)
    {
        $result=$this->insertTable(["event_id" => $event_id, "date_bought" => date('Y-m-d')], "bought_tickets");
        if ($result){
            return [
                "ticketCode"=>$this->conn->lastInsertId()
            ];
        }
    }
}

$api = new TicketPurchase;

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (!isset($_GET["event_id"])) {
        http_response_code(500); // Internal Server Error
        echo "event id is required";
    } else {
        echo json_encode($api->buyticket($_GET["event_id"]));
    }
}
