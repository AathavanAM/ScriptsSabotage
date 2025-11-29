import { Injectable, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';

type EventHandler = (payload?: any) => void;

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket | null = null;
  private connected = signal(false);

  /** Connect (idempotent) */
  connect() {
    if (this.socket && this.socket.connected) return;

    const url = (environment && (environment as any).serverUrl) ? (environment as any).serverUrl : 'http://localhost:3000';
    this.socket = io(url, { autoConnect: true, transports: ['websocket', 'polling'] });

    this.socket.on('connect', () => {
      this.connected.set(true);
      console.log('Socket connected', this.socket?.id);
    });

    this.socket.on('disconnect', (reason: any) => {
      this.connected.set(false);
      console.log('Socket disconnected', reason);
    });

    // optional: log generic errors
    this.socket.on('connect_error', (err: any) => {
      console.warn('Socket connect_error', err);
    });
  }

  disconnect() {
    if (!this.socket) return;
    this.socket.disconnect();
    this.socket = null;
    this.connected.set(false);
  }

  isConnected() {
    return this.connected();
  }

  /** Generic emit */
  emit(event: string, payload?: any, ack?: (res: any) => void) {
    if (!this.socket) this.connect();
    this.socket!.emit(event, payload, (res: any) => ack && ack(res));
  }

  /** Generic on */
  on(event: string, handler: EventHandler) {
    if (!this.socket) this.connect();
    this.socket!.on(event, handler);
  }

  off(event: string, handler?: EventHandler) {
    if (!this.socket) return;
    if (handler) this.socket!.off(event, handler);
    else this.socket!.off(event);
  }

  /* Convenience wrappers (use these from components) */
  createRoom(code: string, payload: any = {}) {
    // emits a standard event name that server should handle (room:create)
    this.emit('room:create', { code, ...payload });
  }

  joinRoom(code: string, payload: any = {}) {
    this.emit('room:join', { code, ...payload });
  }
}