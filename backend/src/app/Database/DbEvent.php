<?php

namespace App\Database;

use App\Models\{Event, Reservation};

class DbEvent
{
    private readonly \PDO $db;

    public function __construct(\PDO $db)
    {
        // Initialize class members.
        $this->db = $db;
    }

    public function Delete(int $id): void
    {
        // Specify the SQL query.
        $query = "DELETE FROM _event WHERE id = ?;";
        // Prepare and execute the query.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $id, \PDO::PARAM_INT);
        $statement->execute();
    }

    public function GetAll(): array
    {
        // Create an empty collection of events.
        $events = [];

        // Specify the SQL query.
        $query = "SELECT _event.id AS event_id, _reservation.id AS reservation_id, title, scheduled_on, capacity, author, email, phone, note FROM _event LEFT JOIN _reservation ON _reservation.assigned_to = _event.id ORDER BY _event.scheduled_on DESC, _reservation.assigned_to, _reservation.author;";
        // Prepare and execute the query.
        $statement = $this->db->prepare($query);
        $statement->execute();
        $statement->bindColumn(1, $event_id, \PDO::PARAM_INT);
        $statement->bindColumn(2, $reservation_id, \PDO::PARAM_INT);
        $statement->bindColumn(3, $title, \PDO::PARAM_STR);
        $statement->bindColumn(4, $scheduled_on, \PDO::PARAM_STR);
        $statement->bindColumn(5, $capacity, \PDO::PARAM_INT);
        $statement->bindColumn(6, $author, \PDO::PARAM_STR);
        $statement->bindColumn(7, $email, \PDO::PARAM_STR);
        $statement->bindColumn(8, $phone, \PDO::PARAM_STR);
        $statement->bindColumn(9, $note, \PDO::PARAM_STR);

        $event = null;

        // Iterate over the result set.
        while ($statement->fetch())
        {
            // Register a new event.
            if ($event === null || $event->id !== $event_id)
            {
                // Create an Event instance.
                $event = new Event();
                $event->id = $event_id;
                $event->title = $title;
                $event->scheduled_on = $scheduled_on;
                $event->capacity = $capacity;

                // Add the event to the collection.
                array_push($events, $event);
            }

            // Register a new reservation.
            if ($reservation_id !== 0)
            {
                // Create a Reservation instance.
                $reservation = new Reservation();
                $reservation->id = $reservation_id;
                $reservation->assigned_to = $event_id;
                $reservation->author = $author;
                $reservation->email = $email;
                $reservation->phone = $phone;
                $reservation->note = $note;

                // Add the reservation to the collection.
                array_push($event->reservations, $reservation);
            }
        }

        return $events;
    }

    public function GetAvailability(int $id): bool
    {
        // Specify the SQL query.
        $query = "WITH figures AS ( SELECT ( SELECT COUNT(*) FROM _reservation WHERE assigned_to = ? FOR UPDATE ) AS reservations, ( SELECT capacity FROM _event WHERE id = ? ) AS capacity ) SELECT ((capacity IS NULL) OR (reservations < capacity)) AS is_available FROM figures;";
        // Prepare and execute the query.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $id, \PDO::PARAM_INT);
        $statement->bindValue(2, $id, \PDO::PARAM_INT);
        $statement->execute();
        $statement->bindColumn(1, $is_available, \PDO::PARAM_BOOL);

        // Fetch all rows.
        $rows = $statement->fetchAll();

        // Check if an event with the requested id exists.
        if (count($rows) > 0)
        {
            return $is_available;
        }

        return false;
    }

    public function GetOfId(int $id): ?Event
    {
        // Specify the SQL query.
        $query = "SELECT title, scheduled_on, capacity FROM _event WHERE id = ?;";
        // Prepare and execute the query.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $id, \PDO::PARAM_INT);
        $statement->execute();
        $statement->bindColumn(1, $title, \PDO::PARAM_STR);
        $statement->bindColumn(2, $scheduled_on, \PDO::PARAM_STR);
        $statement->bindColumn(3, $capacity, \PDO::PARAM_INT);

        // Fetch all rows.
        $rows = $statement->fetchAll();

        // Check if an event with the requested id exists.
        if (count($rows) > 0)
        {
            // Create an Event instance.
            $event = new Event();
            $event->id = $id;
            $event->title = $title;
            $event->scheduled_on = $scheduled_on;
            $event->capacity = $capacity;

            return $event;
        }

        return null;
    }

    public function Insert(Event $event): void
    {
        // Specify the SQL query.
        $query = "INSERT INTO _event (title, scheduled_on, capacity) VALUES (?, ?, ?);";
        // Prepare and execute the query.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $event->title, \PDO::PARAM_STR);
        $statement->bindValue(2, $event->scheduled_on, \PDO::PARAM_STR);
        $statement->bindValue(3, $event->capacity, \PDO::PARAM_INT);
        $statement->execute();
    }

    public function Update(Event $event): void
    {
        // Specify the SQL query.
        $query = "UPDATE _event SET title = ?, scheduled_on = ?, capacity = ? WHERE id = ?;";
        // Prepare and execute the query.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $event->title, \PDO::PARAM_STR);
        $statement->bindValue(2, $event->scheduled_on, \PDO::PARAM_STR);
        $statement->bindValue(3, $event->capacity, \PDO::PARAM_INT);
        $statement->bindValue(4, $event->id, \PDO::PARAM_INT);
        $statement->execute();
    }
}
