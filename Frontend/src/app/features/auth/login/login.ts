import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrls: ['./login.scss']
})
export class Login {

  mobile = '';
  password = '';
  errorMsg = '';
  isLoading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  submitLogin() {
    if (this.isLoading) return;

    if (!this.mobile.trim() || !this.password.trim()) {
      return this.showError('Please enter all fields');
    }

    this.isLoading = true;

    // Mock login (your backend not implemented yet)
    const fakeUserId = `user-${this.mobile}`;
    const fakeToken = `token-${Date.now()}`;

    this.auth.login(fakeToken, fakeUserId);

    // Add success animation before navigation
    setTimeout(() => {
      const loginCard = document.querySelector('.login-card');
      if (loginCard) {
        loginCard.classList.add('fade-out');
      }
    }, 300);

    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/home']);
    }, 800);
  }

  /* Smooth UI input activation */
  onInputFocus(event: any): void {
    event.target.parentElement.classList.add('focused');
  }

  onInputBlur(event: any): void {
    if (!event.target.value.trim()) {
      event.target.parentElement.classList.remove('focused');
    }
  }

  navigateToRegister(): void {
    const loginCard = document.querySelector('.login-card');
    if (loginCard) {
      loginCard.classList.add('fade-out');
    }

    setTimeout(() => {
      this.router.navigate(['/auth/register']);
    }, 300);
  }

  private showError(message: string) {
    this.errorMsg = message;

    setTimeout(() => {
      this.errorMsg = '';
    }, 4000);
  }
}