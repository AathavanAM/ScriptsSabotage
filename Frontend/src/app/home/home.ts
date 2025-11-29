import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss']
})
export class Home {

  constructor(private auth: AuthService, private router: Router) { }

  gotoCreateRoom(): void {
    this.fadeAndNavigate('/lobby/create');
  }

  gotoJoinRoom(): void {
    this.fadeAndNavigate('/lobby/join');
  }

  private fadeAndNavigate(path: string): void {
    const homeContent = document.querySelector('.home-content');
    if (homeContent) {
      homeContent.classList.add('fade-out');
    }

    setTimeout(() => {
      this.router.navigate([path]);
    }, 500);
  }
}