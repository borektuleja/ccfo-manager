<?php

namespace App\Controllers;

use App\Token;
use App\IController;
use App\Database\DbToken;

class AuthController implements IController
{
    private readonly DbToken $dbToken;

    public function __construct(\PDO $db)
    {
        // Initialize class members.
        $this->dbToken = new DbToken($db);
    }

    public function SignIn(): int
    {
        // Get POST data of the request.
        $data = file_get_contents("php://input");

        if ($data)
        {
            // Convert POST data to JSON.
            $json = json_decode($data);

            // Authorize the user.
            if (password_verify($json->password, "$2y$10$9ebqjJpj3o.a6YDQWhI7E.XW8pO14HX04GioBkvPdrNSOeVXs8b4y"))
            {
                // Create a Token instance.
                $token = Token::Unique();

                // Store the instance inside the database.
                $this->dbToken->Insert($token);

                // Instruct the client to set the AUTHTOKEN cookie.
                setcookie("AUTHTOKEN", $token->GetHash(), $token->GetExpiration(), "/", "localhost", false, true);

                // Set HTTP response code to 200 (OK).
                return 200;
            }

            // Set HTTP response code to 403 (Forbidden).
            return 403;
        }

        // Set HTTP response code to 400 (Bad Request).
        return 400;
    }

    public function IsPublic(): bool
    {
        return true;
    }
}
