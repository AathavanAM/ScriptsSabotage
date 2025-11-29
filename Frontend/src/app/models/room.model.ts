export interface Room {
    code: string;
    hostId: string;
    language: string;
    maxMoviesPerUser: number;
    createdAt: string;
    players: string[];
    active: boolean;
}