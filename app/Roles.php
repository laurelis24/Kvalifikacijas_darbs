<?php

namespace App;

enum Roles: string
{
    case ADMIN = 'admin';
    case MODERATOR = 'moderator';
    case USER = 'user';

    public static function all(): array {
        return array_column(Roles::cases(), 'value');
}
}
