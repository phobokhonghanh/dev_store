export interface LoginResponse {
    username: string;
    roles: string[];
}

export interface RegisterResponse {
    username: string;
    email: string;
    fullName: string;
    avatar?: string;
}