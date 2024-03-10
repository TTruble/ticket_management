<?php
class TicketDB
{
    private $host = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "ticket_system";
    protected $conn;

    function __construct()
    {
        try {
            $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname", $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Connection failed: " . $e->getMessage();
        }
    }


    function getAllEvents()
    {
        try {
            $query = $this->conn->query("SELECT * FROM events");
            $events = $query->fetchAll(PDO::FETCH_ASSOC);
            return $events;
        } catch (PDOException $e) {
            return $e; // Return an error status or message
        }
    }

    function insertTable($array, $table){
        try {

            $query = $this->conn->query("INSERT INTO $table (".implode(', ', array_keys($array)).") VALUES ('".implode("', '", array_values($array))."');" );
            if($query) {
                return true;
            }
            return false;
        } catch (PDOException $e) {
            return $e; // Return an error status or message
        }
    }


    function getEventsById($id)
    {
        try {
            $query = $this->conn->prepare("SELECT * FROM events WHERE event_id = ?");
            $query->execute([$id]);
            $event = $query->fetch(PDO::FETCH_ASSOC);
            return $event;
        } catch (PDOException $e) {
            return $e; // Return an error status or message
        }
    }
}
