<?php

namespace App\Database;

use App\Models\Reservation;

class DbReservation
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
        $query = "DELETE FROM _reservation WHERE id = ?;";
        // Prepare and execute the query.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $id, \PDO::PARAM_INT);
        $statement->execute();
    }

    public function Insert(Reservation $reservation): void
    {
        // Specify the SQL query.
        $query = "INSERT INTO _reservation (assigned_to, author, email, phone, note) VALUES (?, ?, ?, ?, ?);";
        // Prepare and execute the query.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $reservation->assigned_to, \PDO::PARAM_INT);
        $statement->bindValue(2, $reservation->author, \PDO::PARAM_STR);
        $statement->bindValue(3, $reservation->email, \PDO::PARAM_STR);
        $statement->bindValue(4, $reservation->phone, \PDO::PARAM_STR);
        $statement->bindValue(5, $reservation->note, \PDO::PARAM_STR);
        $statement->execute();
    }

    public function Update(Reservation $reservation): void
    {
        // Specify the SQL query.
        $query = "UPDATE _reservation SET author = ?, email = ?, phone = ?, note = ? WHERE id = ?;";
        // Prepare and execute the query.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $reservation->author, \PDO::PARAM_STR);
        $statement->bindValue(2, $reservation->email, \PDO::PARAM_STR);
        $statement->bindValue(3, $reservation->phone, \PDO::PARAM_STR);
        $statement->bindValue(4, $reservation->note, \PDO::PARAM_STR);
        $statement->bindValue(5, $reservation->id, \PDO::PARAM_INT);
        $statement->execute();
    }
}
