<?php

namespace App\Controllers;

use App\IController;
use App\Models\Reservation;
use App\Database\{DbEvent, DbReservation};

class ReservationController implements IController
{
    private readonly \PDO $db;
    private readonly DbEvent $dbEvent;
    private readonly DbReservation $dbReservation;

    public function __construct(\PDO $db)
    {
        // Initialize class members.
        $this->db = $db;
        $this->dbEvent = new DbEvent($db);
        $this->dbReservation = new DbReservation($db);
    }

    public function Delete(int $id): int
    {
        // Delete the plan from the database.
        $this->dbReservation->Delete($id);

        // Set HTTP response code to 204 (No Content).
        return 204;
    }

    public function Patch(int $id): int
    {
        // Get POST data from the request.
        $data = file_get_contents("php://input");

        if ($data)
        {
            // Convert POST data to JSON.
            $json = json_decode($data);

            // Create a Reservation instance.
            $reservation = new Reservation();
            $reservation->id = $id;
            $reservation->author = $json->author;
            $reservation->email = $json->email;
            $reservation->phone = $json->phone;
            $reservation->note = $json->note;

            // Update the Reservation inside the database.
            $this->dbReservation->Update($reservation);

            // Set HTTP response code to 204 (No Content).
            return 204;
        }

        // Set HTTP response code to 400 (Bad Request).
        return 400;
    }

    public function Post(): int
    {
        // Get POST data from the request.
        $data = file_get_contents("php://input");

        if ($data)
        {
            // Convert POST data to JSON.
            $json = json_decode($data);

            // Create a Reservation instance.
            $reservation = new Reservation();
            $reservation->assigned_to = $json->assigned_to;
            $reservation->author = $json->author;
            $reservation->email = $json->email;
            $reservation->phone = $json->phone;
            $reservation->note = $json->note;

            // Begin a transaction.
            $this->db->beginTransaction();

            // Check if the event is still available for registration.
            if ($this->dbEvent->GetAvailability($json->assigned_to))
            {
                // Store the Reservation inside the database.
                $this->dbReservation->Insert($reservation);

                // Commit the transaction.
                $this->db->commit();

                // Set HTTP response code to 201 (Created).
                return 201;
            }
            else
            {
                // Rollback the transaction.
                $this->db->rollBack();

                // Set HTTP response code to 403 (Forbidden).
                return 403;
            }
        }

        // Set HTTP response code to 400 (Bad Request).
        return 400;
    }

    public function IsPublic(): bool
    {
        return true;
    }
}
