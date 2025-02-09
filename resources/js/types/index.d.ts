import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    username: string;
    roles: string[];
    email: string;
    isBanned: boolean;
    email_verified_at?: string;
}

export interface Category {
    id: number;
    title: string;
    description: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
};
