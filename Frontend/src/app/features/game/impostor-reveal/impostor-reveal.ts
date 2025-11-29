import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SocketService } from '../../../core/socket.service';
import { SOCKET_EVENTS } from '../../../core/socket.events';

@Component({
  standalone: true,
  selector: 'app-impostor-reveal',
  imports: [CommonModule],
  templateUrl: './impostor-reveal.html',
  styleUrls: ['./impostor-reveal.scss']
})
export class ImpostorReveal implements OnInit {
  impostorName = 'Unknown';

  constructor(private router: Router, private socket: SocketService) { }

  ngOnInit() {
    this.socket.on(SOCKET_EVENTS.REVEAL, (data: any) => {
      this.impostorName = data.name ?? 'Unknown';
    });

    // Ask server for reveal info
    this.socket.emit('game:reveal:get');
  }

  next() {
    this.router.navigate(['/game/results']);
  }
}