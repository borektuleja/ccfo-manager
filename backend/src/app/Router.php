<?php

namespace App;

use App\Database\DbToken;

class Router
{
    public function Handle(\PDO $db): int
    {
        // Choose a controller to handle the request.
        $controller = "App\\Controllers\\" . $_GET["controller"];
        $method     =                        $_GET["method"];
        $params     = array_splice($_GET, 2);

        try
        {
            // Create a concrete controller instance.
            $subject = new $controller($db);

            // Authorize the request.
            if ($subject->IsPublic() || $this->IsTrusted($db))
            {
                // Handle the request.
                $status = call_user_func_array([$subject, $method], $params);
                return $status;
            }
            else
            {
                // Set HTTP response code to 401 (Unauthrorized).
                return 401;
            }
        }
        catch (\Throwable $e)
        {
            // Rollback all transactions.
            if ($db->inTransaction())
            {
                $db->rollBack();
            }

            // Set HTTP response code to 500 (Internal Server Error).
            return 500;
        }
    }

    private function IsTrusted(\PDO $db): bool
    {
        // Check if the AUTHTOKEN cookie was sent within the request.
        if (isset($_COOKIE["AUTHTOKEN"]))
        {
            // Try to read the token from the database.
            $dbToken = new DbToken($db);
            $token = $dbToken->GetOfHash($_COOKIE["AUTHTOKEN"]);

            // Authorize the user if the token is still valid.
            return ($token && $token->IsValid());
        }

        return false;
    }
}
