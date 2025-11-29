import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SocketService } from '../../../core/socket.service';
import { SOCKET_EVENTS } from '../../../core/socket.events';

@Component({
  standalone: true,
  selector: 'app-results-screen',
  imports: [CommonModule],
  templateUrl: './results-screen.html',
  styleUrls: ['./results-screen.scss']
})
export class ResultsScreen implements OnInit {
  result = '';
  eliminated = '';

  constructor(private router: Router, private socket: SocketService) { }

  ngOnInit() {
    this.socket.on(SOCKET_EVENTS.RESULTS, (data: any) => {
      this.result = data.result || 'No result';
      this.eliminated = data.eliminated || '';
    });

    // Ask server for results state
    this.socket.emit('game:results:get');
  }

  backToLobby() {
    this.socket.emit(SOCKET_EVENTS.LEAVE_ROOM);
    this.router.navigate(['/lobby']);
  }
}