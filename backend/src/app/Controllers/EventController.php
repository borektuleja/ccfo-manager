<?php

namespace App\Controllers;

use App\IController;
use App\Models\Event;
use App\Database\DbEvent;

class EventController implements IController
{
    private readonly DbEvent $dbEvent;

    public function __construct(\PDO $db)
    {
        // Initialize class members.
        $this->dbEvent = new DbEvent($db);
    }

    public function Delete(int $id): int
    {
        // Delete the event from the database.
        $this->dbEvent->Delete($id);

        // Set HTTP response code to 204 (No Content).
        return 204;
    }

    public function Get(): int
    {
        // Query events from the database.
        $events = $this->dbEvent->GetAll();
        // Encode data as JSON response.
        echo json_encode($events);

        // Set HTTP response code to 200 (OK).
        return 200;
    }

    public function Patch(int $id): int
    {
        // Get POST data from the request.
        $data = file_get_contents("php://input");

        if ($data)
        {
            // Convert POST data to JSON.
            $json = json_decode($data);

            // Create a Event instance.
            $event = new Event();
            $event->id = $id;
            $event->title = $json->title;
            $event->scheduled_on = $json->scheduled_on;
            $event->capacity = $json->capacity;

            // Update the Event inside the database.
            $this->dbEvent->Update($event);

            // Set HTTP response code to 204 (No Content).
            return 204;
        }

        // Set HTTP response code to 400 (Bad Request).
        return 400;
    }

    public function Post(): int
    {
        // Get POST data of the request.
        $data = file_get_contents("php://input");

        if ($data)
        {
            // Convert POST data to JSON.
            $json = json_decode($data);

            // Create a Event instance.
            $event = new Event();
            $event->title = $json->title;
            $event->scheduled_on = $json->scheduled_on;
            $event->capacity = $json->capacity;

            // Store the Event inside the database.
            $this->dbEvent->Insert($event);

            // Set HTTP response code to 201 (Created).
            return 201;
        }

        // Set HTTP response code to 400 (Bad Request).
        return 400;
    }

    public function IsPublic(): bool
    {
        return true;
    }
}
