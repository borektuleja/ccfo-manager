<?php

namespace App\Models;

class Reservation
{
    public ?int $id;
    public ?int $assigned_to;
    public ?string $author;
    public ?string $email;
    public ?string $phone;
    public ?string $note;
}
