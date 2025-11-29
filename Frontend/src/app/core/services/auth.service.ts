import { Injectable, signal } from '@angular/core';

export interface StoredUser {
  userId: string;
  username: string;
  mobile: string;
  gender: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /* ----------------------- Signals ----------------------- */
  private readonly _isLoggedIn = signal<boolean>(false);
  private readonly _token = signal<string | null>(null);
  private readonly _userId = signal<string | null>(null);

  isLoggedIn = this._isLoggedIn.asReadonly();
  token = this._token.asReadonly();
  userId = this._userId.asReadonly();

  constructor() {
    this.loadFromLocalStorage();
  }

  /* ----------------------- Basic Auth ----------------------- */

  login(token: string, userId: string): void {
    this._isLoggedIn.set(true);
    this._token.set(token);
    this._userId.set(userId);

    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('isLoggedIn', 'true');
  }

  logout(): void {
    this._isLoggedIn.set(false);
    this._token.set(null);
    this._userId.set(null);

    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('isLoggedIn');
  }

  getUserId(): string | null {
    return this._userId();
  }

  getToken(): string | null {
    return this._token();
  }


  /* ----------------------- User Storage ----------------------- */

  saveUser(user: StoredUser): void {
    localStorage.setItem(`user_${user.userId}`, JSON.stringify(user));
  }

  getUser(userId: string): StoredUser | null {
    const raw = localStorage.getItem(`user_${userId}`);
    return raw ? JSON.parse(raw) : null;
  }

  /* Returns current logged-in user's profile */
  getCurrentUser(): StoredUser | null {
    const id = this._userId();
    if (!id) return null;
    return this.getUser(id);
  }

  /* ----------------------- Local Storage Sync ----------------------- */

  private loadFromLocalStorage(): void {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (loggedIn && token && userId) {
      this._token.set(token);
      this._userId.set(userId);
      this._isLoggedIn.set(true);
    }
  }
}