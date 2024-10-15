<?php

namespace App;

define("LONGETIVITY", 31 * 24 * 3600);

class Token
{
    private string $hash;
    private int $expiration;

    public function GetHash(): string
    {
        return $this->hash;
    }

    public function GetExpiration(): int
    {
        return $this->expiration;
    }

    public function GetExpirationAsDate(): string
    {
        return date("Y-m-d H:i:s", $this->expiration);
    }

    public function __construct(string $hash, int $expiration)
    {
        // Initialize class members.
        $this->hash = $hash;
        $this->expiration = $expiration;
    }

    public function Refresh(): void
    {
        // Refresh token's expiration time.
        $this->expiration = time() + LONGETIVITY;
    }

    public function IsValid(): bool
    {
        return $this->expiration > time();
    }

    public static function Unique(): Token
    {
        // Generate a unique hash.
        $hash = bin2hex(random_bytes(32));
        // Create a new unique Token instance.
        return new Token($hash, time() + LONGETIVITY);
    }
}
