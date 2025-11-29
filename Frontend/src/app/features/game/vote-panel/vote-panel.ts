import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SocketService } from '../../../core/socket.service';
import { SOCKET_EVENTS } from '../../../core/socket.events';

@Component({
  standalone: true,
  selector: 'app-vote-panel',
  imports: [CommonModule],
  templateUrl: './vote-panel.html',
  styleUrls: ['./vote-panel.scss']
})
export class VotePanel implements OnInit, OnDestroy {
  players: string[] = [];
  selected: string | null = null;

  constructor(private router: Router, private socket: SocketService) { }

  ngOnInit() {
    this.socket.connect();

    // When vote starts
    this.socket.on(SOCKET_EVENTS.VOTE_START, (data: any) => {
      this.players = data.players || [];
      this.selected = null;
    });

    // When vote ends (move to reveal screen)
    this.socket.on(SOCKET_EVENTS.VOTE_END, () => {
      this.router.navigate(['/game/reveal']);
    });

    // Request current vote state
    this.socket.emit('game:vote:get');
  }

  vote(name: string) {
    this.selected = name;
  }

  submitVote() {
    this.socket.emit(SOCKET_EVENTS.VOTE_CAST, { vote: this.selected });
  }

  ngOnDestroy() {
    this.socket.off(SOCKET_EVENTS.VOTE_START);
    this.socket.off(SOCKET_EVENTS.VOTE_END);
  }
}