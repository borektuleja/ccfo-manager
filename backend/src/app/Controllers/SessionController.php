<?php

namespace App\Controllers;

use App\IController;
use App\Database\DbToken;

class SessionController implements IController
{
    private readonly DbToken $dbToken;

    public function __construct(\PDO $db)
    {
        // Initialize class members.
        $this->dbToken = new DbToken($db);
    }

    public function Token(): int
    {
        // Query a token from the database and refresh it.
        $token = $this->dbToken->GetOfHash($_COOKIE["AUTHTOKEN"]);
        $token->Refresh();

        // Update the instance inside the database.
        $this->dbToken->Update($token);

        // Instruct the client to set the AUTHTOKEN cookie.
        setcookie("AUTHTOKEN", $token->GetHash(), $token->GetExpiration(), "/", "localhost", false, true);

        // Set HTTP response code to 200 (OK).
        return 200;
    }

    public function IsPublic(): bool
    {
        return false;
    }
}
