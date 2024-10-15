<?php

require_once __DIR__ . "/autoloader.php";

use App\Router;
use App\Database\DbFactory;

try
{
    // Request a MySQL database connection.
    $db = DbFactory::GetMySqlConnection();

    // Create a Router instance.
    $router = new Router();

    // Handle a HTTP request.
    $status = $router->Handle($db);
    http_response_code($status);
}
catch (PDOException $e)
{
    // Set HTTP response code to 503 (Service Unavailable).
    http_response_code(503);
}
