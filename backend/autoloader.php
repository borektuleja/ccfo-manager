<?php

class Autoloader
{
    public static function Initialize(): void
    {
        // Register an autoload function.
        spl_autoload_register(function (string $class): void
        {
            // Format path of the loaded class.
            $filename = __DIR__ . "/src/" . lcfirst(str_replace("\\", "/", $class)) . ".php";

            // Check if the class file exists.
            if (file_exists($filename))
            {
                // Load the class file.
                require $filename;
            }
        });
    }
}

Autoloader::Initialize();
