export interface User {
    userId: string;
    mobile: string;
    name?: string;
    gender?: string;
    language?: string;
    yearRange?: { from: number; to: number };
}