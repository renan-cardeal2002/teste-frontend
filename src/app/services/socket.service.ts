import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  emitirEvento(evento: string, dados: any): void {
    this.socket.emit(evento, dados);
  }

  ouvirEvento<T>(evento: string): Observable<T> {
    return new Observable<T>((observer) => {
      this.socket.on(evento, (dados: T) => {
        observer.next(dados);
      });

      return () => this.socket.off(evento);
    });
  }
}
