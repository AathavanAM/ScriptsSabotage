import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {

  mobile = '';
  username = '';
  gender = '';
  password = '';
  errorMsg = '';
  isLoading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  /* Focus Effects */
  onInputFocus(event: any): void {
    event.target.parentElement.classList.add('focused');
  }

  onInputBlur(event: any): void {
    if (!event.target.value) {
      event.target.parentElement.classList.remove('focused');
    }
    this.validateField(event.target);
  }

  /* Validation */
  private validateField(field: any): void {
    const parent = field.parentElement;
    parent.classList.remove('valid', 'invalid');

    if (!field.value) {
      parent.classList.add('invalid');
      return;
    }

    if (field.placeholder === 'Mobile Number') {
      const mobileRegex = /^[0-9]{10}$/;
      parent.classList.add(mobileRegex.test(field.value) ? 'valid' : 'invalid');
    } else if (field.type === 'password') {
      parent.classList.add(field.value.length >= 6 ? 'valid' : 'invalid');
    } else {
      parent.classList.add('valid');
    }
  }

  /* Register + AuthService Integration */
  submitRegister() {
    if (this.isLoading) return;

    if (!this.mobile || !this.username || !this.gender || !this.password) {
      this.showError('Please fill all fields');
      return;
    }

    const mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(this.mobile)) {
      this.showError('Please enter a valid 10-digit mobile number');
      return;
    }

    if (this.password.length < 6) {
      this.showError('Password must be at least 6 characters long');
      return;
    }

    this.isLoading = true;

    /* Simulated API call */
    setTimeout(() => {
      /* Mock Token + User ID */
      const fakeToken = 'token-' + this.mobile;
      const fakeUserId = 'user-' + this.mobile;

      /* Store Auth Data Using Signals */
      this.auth.login(fakeToken, fakeUserId);

      /* Success animation */
      const registerCard = document.querySelector('.register-card');
      registerCard?.classList.add('success-check');

      setTimeout(() => registerCard?.classList.add('fade-out'), 400);

      setTimeout(() => {
        this.router.navigate(['/home']);
      }, 800);

    }, 2000);
  }

  /* Switch to login */
  navigateToLogin(event: Event): void {
    event.preventDefault();

    const registerCard = document.querySelector('.register-card');
    registerCard?.classList.add('fade-out');

    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 300);
  }

  private showError(message: string): void {
    this.errorMsg = message;

    setTimeout(() => {
      this.errorMsg = '';
    }, 5000);
  }
}