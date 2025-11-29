import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LobbyService } from '../lobby.service';
import { SocketService } from '../../../core/socket.service';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-create-room',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './create-room.html',
  styleUrls: ['./create-room.scss']
})
export class CreateRoom {

  roomCode: string = '';
  isGenerating = false;

  statusMessage = '';
  statusType: 'success' | 'error' = 'success';

  // Floating animated codes for HTML
  floatingCodes = [
    { value: 'ABCD12', left: '10%', top: '20%', delay: '0s' },
    { value: 'EFGH34', left: '80%', top: '30%', delay: '2s' },
    { value: 'IJKL56', left: '20%', top: '70%', delay: '4s' },
    { value: 'MNOP78', left: '70%', top: '80%', delay: '1s' },
    { value: 'QRST90', left: '50%', top: '10%', delay: '3s' },
    { value: 'UVWX23', left: '90%', top: '60%', delay: '5s' },
    { value: 'YZAB45', left: '30%', top: '40%', delay: '6s' },
    { value: 'CDEF67', left: '60%', top: '90%', delay: '7s' }
  ];

  constructor(
    private lobby: LobbyService,
    private socket: SocketService,
    private auth: AuthService,
    private router: Router
  ) { }

  async generateRoom() {
    if (this.isGenerating) return;

    this.isGenerating = true;
    this.statusMessage = '';

    // Smooth loading effect
    await new Promise(res => setTimeout(res, 900));

    try {
      // Generate room code
      this.roomCode = this.lobby.generateRoomCode();

      // Initialize socket
      this.socket.connect();
      const userId = this.auth.getUserId() || localStorage.getItem('userId');
      this.socket.createRoom(this.roomCode, { hostId: userId });


      this.showStatus('Room created successfully!', 'success');

      // Auto copy code
      this.copyToClipboard();

    } catch (error) {
      console.error('Error creating room:', error);
      this.showStatus('Failed to create room. Try again.', 'error');
    } finally {
      this.isGenerating = false;
    }
  }

  copyToClipboard() {
    if (!this.roomCode) return;

    navigator.clipboard.writeText(this.roomCode)
      .then(() => this.showStatus('Room code copied to clipboard!', 'success'))
      .catch(() => {
        // Fallback for browsers
        const textarea = document.createElement('textarea');
        textarea.value = this.roomCode;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        this.showStatus('Room code copied!', 'success');
      });
  }

  shareRoom() {
    if (!this.roomCode) return;

    if (navigator.share) {
      navigator.share({
        title: 'Join my Movie Room',
        text: `Use this code to join my room: ${this.roomCode}`,
        url: window.location.origin
      }).catch(() => this.copyToClipboard());
    } else {
      this.copyToClipboard();
    }
  }

  navigateToHome() {
    const card = document.querySelector('.create-room-card');
    card?.classList.add('fade-out');

    setTimeout(() => {
      this.router.navigate(['/']);
    }, 300);
  }

  navigateToJoinRoom() {
    const card = document.querySelector('.create-room-card');
    card?.classList.add('fade-out');

    setTimeout(() => {
      this.router.navigate(['/lobby/join']);
    }, 300);
  }

  private showStatus(message: string, type: 'success' | 'error') {
    this.statusMessage = message;
    this.statusType = type;

    if (type === 'success') {
      setTimeout(() => {
        if (this.statusMessage === message) {
          this.statusMessage = '';
        }
      }, 2500);
    }
  }
}