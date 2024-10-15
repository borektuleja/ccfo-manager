<?php

namespace App\Database;

use App\Token;

class DbToken
{
    private readonly \PDO $db;

    public function __construct(\PDO $db)
    {
        // Initialize class members.
        $this->db = $db;
    }

    public function Delete(string $hash): void
    {
        // Specify the SQL query.
        $query = "DELETE FROM _token WHERE hash = ?;";
        // Prepare and execute the statement.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $hash, \PDO::PARAM_STR);
        $statement->execute();
    }

    public function GetOfHash(string $hash): ?Token
    {
        // Prepare the SQL query.
        $query = "SELECT expiration FROM _token WHERE hash = ?;";
        // Prepare and execute the statement.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $hash, \PDO::PARAM_STR);
        $statement->execute();
        $statement->bindColumn(1, $expiration, \PDO::PARAM_STR);

        // Fetch all rows.
        $rows = $statement->fetchAll();

        // Check if a token with the requested hash exists.
        if (count($rows) > 0)
        {
            // Create a Token instance.
            return new Token($hash, strtotime($expiration));
        }

        return null;
    }

    public function Insert(Token $token): void
    {
        // Prepare the SQL query.
        $query = "INSERT INTO _token (hash, expiration) VALUES (?, ?);";
        // Prepare and execute the statement.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $token->GetHash(), \PDO::PARAM_STR);
        $statement->bindValue(2, $token->GetExpirationAsDate(), \PDO::PARAM_STR);
        $statement->execute();
    }

    public function Update(Token $token): void
    {
        // Prepare the SQL query.
        $query = "UPDATE _token SET expiration = ? WHERE hash = ?;";
        // Prepare and execute the statement.
        $statement = $this->db->prepare($query);
        $statement->bindValue(1, $token->GetExpirationAsDate(), \PDO::PARAM_STR);
        $statement->bindValue(2, $token->GetHash(), \PDO::PARAM_STR);
        $statement->execute();
    }
}
