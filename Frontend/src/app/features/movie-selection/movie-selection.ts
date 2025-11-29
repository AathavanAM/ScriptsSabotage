import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService, Movie } from '../../core/services/movie.service';
import { AuthService } from '../../core/services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-movie-selection',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, NgForOf],
  templateUrl: './movie-selection.html',
  styleUrls: ['./movie-selection.scss'],
})
export class MovieSelection implements OnInit {
  language = '';
  yearFrom = new Date().getFullYear() - 10;
  yearTo = new Date().getFullYear();
  page = 1;
  currentYear = new Date().getFullYear();

  loading = false;
  movies: Movie[] = [];
  selectedMovieIds = new Set<number>();
  maxSelectable = 50;
  userId: string | null = null;
  error = '';

  availableLanguages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'it', name: 'Italian', nativeName: 'Italiano' },
    { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
    { code: 'ru', name: 'Russian', nativeName: 'Русский' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' }
  ];

  constructor(private movieService: MovieService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userId = this.auth.getUserId();
  }

  /* ------------------------
     MOVIE IMAGE HELPERS
  ------------------------- */
  posterUrl(path: string | null | undefined): string {
    if (!path) return 'assets/no-image.png';
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  onImageLoad(e: any) {
    e.target.classList.add('loaded');
  }

  onImageError(e: any) {
    e.target.src = 'assets/no-image.png';
  }

  /* ------------------------
     FILTER / INPUT HELPERS
  ------------------------- */
  setMax(value: number) {
    const num = Number(value);
    if (!isNaN(num) && num > 0 && num <= 1000) {
      this.maxSelectable = num;
    }
  }

  onFilterFocus(e: any) {
    e.target.classList.add('ring-2', 'ring-sky-400');
  }

  onFilterBlur(e: any) {
    e.target.classList.remove('ring-2', 'ring-sky-400');
  }

  /* ------------------------
     FETCH MOVIES FROM API
  ------------------------- */
  fetch() {
    this.error = '';
    if (!this.language) {
      this.error = 'Please select a language.';
      return;
    }

    this.loading = true;

    this.movieService
      .discoverMovies(this.language, this.yearFrom, this.yearTo, this.page)
      .subscribe({
        next: (res: any) => {
          this.movies = res.results || [];
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to fetch movies.';
          this.loading = false;
        },
      });
  }

  /* ------------------------
     SELECTION LOGIC
  ------------------------- */
  toggleSelect(movie: Movie) {
    if (this.selectedMovieIds.has(movie.id)) {
      this.selectedMovieIds.delete(movie.id);
    } else {
      if (this.selectedMovieIds.size >= this.maxSelectable) return;
      this.selectedMovieIds.add(movie.id);
    }
  }

  /* ------------------------
     PAGINATION
  ------------------------- */
  previousPage() {
    if (this.page > 1) {
      this.page--;
      this.fetch();
    }
  }

  nextPage() {
    this.page++;
    this.fetch();
  }

  /* ------------------------
     SAVE USER MOVIE SELECTION
  ------------------------- */
  saveSelections() {
    if (!this.userId) return;

    const ids = Array.from(this.selectedMovieIds);
    this.movieService.saveUserMovies(this.userId, ids);

    alert('Saved Successfully!');
  }

  /* ------------------------
     RATING FORMATTER
  ------------------------- */
  getFormattedRating(vote: number): string {
    return (vote / 2).toFixed(1);
  }
}