<?php

namespace App\Models;

class Event
{
    public ?int $id;
    public ?string $title;
    public ?string $scheduled_on;
    public ?int $capacity;
    public array $reservations = [];
}
