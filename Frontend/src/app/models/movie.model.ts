export interface Movie {
    id: number;
    title: string;
    poster_path?: string | null;
    release_date?: string;
    original_language?: string;
    vote_average?: number;
    overview?: string;
    genre_ids?: number[];
    backdrop_path?: string | null;
    popularity?: number;
    vote_count?: number;
    adult?: boolean;
    video?: boolean;
}