<?php

namespace App;

enum Permissions: string
{
    case EDIT_POSTS = 'edit_posts';
    case DELETE_POSTS = 'delete_posts';
    case BAN_USERS = 'ban_users';
    case ACCESS_ADMIN_PANEL = 'admin_panel';

    public static function all(): array {
        return array_column(Permissions::cases(), 'value');
    }
}
