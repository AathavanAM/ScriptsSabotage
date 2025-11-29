import { Component, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SocketService } from '../../../core/socket.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-join-room',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './join-room.html',
  styleUrls: ['./join-room.scss']
})
export class JoinRoom {
  roomCode = '';
  isJoining = false;

  statusMessage = '';
  statusType: 'success' | 'error' = 'success';

  floatingCodes = [
    { value: 'ROOM01', left: '15%', top: '25%', delay: '0s' },
    { value: 'JOIN12', left: '85%', top: '35%', delay: '2s' },
    { value: 'PARTY34', left: '25%', top: '75%', delay: '4s' },
    { value: 'MOVIE56', left: '75%', top: '85%', delay: '1s' },
    { value: 'FUN789', left: '55%', top: '15%', delay: '3s' },
    { value: 'WATCH0', left: '95%', top: '65%', delay: '5s' },
    { value: 'SHARE1', left: '35%', top: '45%', delay: '6s' },
    { value: 'CHILL2', left: '65%', top: '95%', delay: '7s' }
  ];

  /** Computed validation */
  get isValidCode(): boolean {
    return /^[A-Z0-9]{5,6}$/.test(this.roomCode);
  }

  constructor(
    private socket: SocketService,
    private auth: AuthService,
    private router: Router
  ) {
    /** Listen to socket events */
    effect(() => {
      this.socket.on('room-joined', () => {
        this.showStatus('Successfully joined room!', 'success');
        setTimeout(() => {
          this.router.navigate(['/room', this.roomCode]);
        }, 1000);
      });

      this.socket.on('room-error', (msg: string) => {
        this.showStatus(msg || 'Could not join room', 'error');
        this.isJoining = false;
      });
    });
  }

  /** Auto uppercase + validation */
  onCodeInput(event: any) {
    this.roomCode = event.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '');

    if (this.statusMessage && this.statusType === 'error') {
      this.statusMessage = '';
    }
  }

  /** Join button */
  async join() {
    if (!this.isValidCode) {
      this.showStatus('Room code must be 5–6 letters or numbers.', 'error');
      return;
    }

    this.isJoining = true;
    this.statusMessage = '';

    await new Promise(r => setTimeout(r, 1200)); // UX delay

    try {
      this.socket.connect();
      const userId = this.auth.getUserId() || localStorage.getItem('userId');
      this.socket.joinRoom(this.roomCode, { userId: userId });
    } catch (err) {
      this.showStatus('Connection failed. Try again.', 'error');
      this.isJoining = false;
    }
  }

  navigateToHome() {
    document.querySelector('.join-room-card')?.classList.add('fade-out');
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 300);
  }

  private showStatus(message: string, type: 'success' | 'error') {
    this.statusMessage = message;
    this.statusType = type;

    if (type === 'success') {
      setTimeout(() => {
        if (this.statusMessage === message) this.statusMessage = '';
      }, 3000);
    }
  }
}