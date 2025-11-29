import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SocketService } from '../../../core/socket.service';
import { SOCKET_EVENTS } from '../../../core/socket.events';

@Component({
  standalone: true,
  selector: 'app-game-screen',
  imports: [CommonModule],
  templateUrl: './game-screen.html',
  styleUrls: ['./game-screen.scss']
})
export class GameScreen implements OnInit, OnDestroy {
  round = signal(1);
  timeLeft = signal(30);
  interval: any;

  constructor(private router: Router, private socket: SocketService) { }

  ngOnInit() {
    this.socket.connect();

    // When server starts a round
    this.socket.on(SOCKET_EVENTS.ROUND_START, (data: any) => {
      this.round.set(data.round ?? 1);
      this.startTimer(data.duration ?? 30);
    });

    // When server forces end of round
    this.socket.on(SOCKET_EVENTS.ROUND_END, () => {
      this.goToVote();
    });

    // (Optional) Tell server we are ready
    this.socket.emit(SOCKET_EVENTS.NEXT_ROUND, {});
  }

  startTimer(seconds: number) {
    this.timeLeft.set(seconds);

    if (this.interval) clearInterval(this.interval);

    this.interval = setInterval(() => {
      const newTime = this.timeLeft() - 1;

      this.timeLeft.set(newTime);

      if (newTime <= 0) {
        clearInterval(this.interval);
        this.goToVote();
      }
    }, 1000);
  }

  goToVote() {
    this.router.navigate(['/game/vote']);
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }
}