import {Component, OnInit} from '@angular/core';
import {SocketService} from "../services/socket.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-mensagens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [SocketService],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.css'
})
export class MensagensComponent implements OnInit {
  numero_destino: string = '';
  novaMensagem: string = '';
  mensagens: any[] = [];

  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    this.socketService.ouvirEvento<any>('mensagemRecebida').subscribe((mensagem) => {
      this.mensagens.push(mensagem);
    });
  }

  enviarMensagem(): void {
    if (this.novaMensagem) {
      const mensagem = {
        cliente_id: 1,
        numero_destino: this.numero_destino,
        is_whatsapp: false,
        texto: this.novaMensagem,
      };

      this.socketService.emitirEvento('enviarMensagem', mensagem);
      this.novaMensagem = '';
    }
  }
}
