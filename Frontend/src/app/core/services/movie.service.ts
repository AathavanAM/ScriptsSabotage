import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';

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

@Injectable({ providedIn: 'root' })
export class MovieService {
  private base = environment.tmdbBaseUrl;
  private apiKey = environment.tmdbApiKey;
  private imageBase = environment.tmdbImageBase;

  constructor(private http: HttpClient) { }

  /* Discover movies by language and year-range (years inclusive) */
  discoverMovies(languageCode: string, yearFrom: number, yearTo: number, page = 1) {
    /* TMDB expects dates; build from years */
    const gte = `${yearFrom}-01-01`;
    const lte = `${yearTo}-12-31`;

    let params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en-US') /* response language, keep English for titles */
      .set('sort_by', 'primary_release_date.desc')
      .set('page', String(page))
      .set('primary_release_date.gte', gte)
      .set('primary_release_date.lte', lte);

    /* if user passed a language code (like 'hi' or 'en'), TMDB has 'with_original_language' */
    if (languageCode) {
      params = params.set('with_original_language', languageCode);
    }

    return this.http.get<{ results: Movie[] }>(`${this.base}/discover/movie`, { params });
  }

  /* Optional: fetch by movie ids (for details) */
  getMovieDetails(id: number) {
    const params = new HttpParams().set('api_key', this.apiKey).set('language', 'en-US');
    return this.http.get<Movie>(`${this.base}/movie/${id}`, { params });
  }

  /* Helper to build poster url */
  posterUrl(path?: string | null) {
    return path ? `${this.imageBase}${path}` : 'assets/images/movie-placeholder.jpg';
  }

  /* Persist per-user movie list (localStorage). Format: 'movies_{userId}' */
  saveUserMovies(userId: string, movieIds: number[]) {
    if (!userId) return;
    localStorage.setItem(`movies_${userId}`, JSON.stringify(movieIds));
  }


  getUserMovies(userId: string): number[] {
    if (!userId) return [];
    const raw = localStorage.getItem(`movies_${userId}`);
    return raw ? JSON.parse(raw) as number[] : [];
  }
}