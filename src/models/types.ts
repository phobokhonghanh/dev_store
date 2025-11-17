export interface Filters {
    categories: string[];
    priceRange: [number, number] | undefined;
    rating: number;
}

export interface LoginRequest {
    identifier: string;
    password: string;
}

export interface LoginResponse {
    username: string;
    roles: string[];
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
    avatar?: string;
}

export interface RegisterResponse {
    username: string;
    email: string;
    fullName: string;
    avatar?: string;
}