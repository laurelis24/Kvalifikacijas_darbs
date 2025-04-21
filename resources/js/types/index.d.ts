import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    username: string;
    roles: string[];
    email?: string;
    is_banned: boolean;
    email_verified_at?: string;
}

export interface CategoryProps {
    id: number;
    title: string;
    description: string;
    color: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
