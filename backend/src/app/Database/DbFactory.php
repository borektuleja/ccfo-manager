<?php

namespace App\Database;

define("HOSTNAME", "localhost");
define("USERNAME", "root");
define("PASSWORD", "");
define("DATABASE", "event");

class DbFactory
{
    public static function GetMySqlConnection(): \PDO
    {
        // Format the connection string.
        $dsn = sprintf("mysql:host=%s;dbname=%s", HOSTNAME, DATABASE);
        // Try to establish connection with a MySQL database.
        return new \PDO($dsn, USERNAME, PASSWORD, [
            \PDO::ATTR_ERRMODE => \PDO::ERRMODE_EXCEPTION,
        ]);
    }
}
