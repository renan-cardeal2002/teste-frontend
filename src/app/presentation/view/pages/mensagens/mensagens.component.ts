import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../../../infra/services/socket.service";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {ActivatedRoute} from "@angular/router";
import {RequestService} from "../../../../infra/services/request.service";
import {IMensagem} from "../../../../domain/interfaces/imensagem";

@Component({
  selector: 'app-mensagens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [SocketService],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.css'
})
export class MensagensComponent implements OnInit {
  cliente_id: number = 0;
  numero_destino: string = '';
  novaMensagem: string = '';
  mensagens: IMensagem[] | null = [];

  constructor(private socketService: SocketService, private route: ActivatedRoute, private requestService: RequestService) {
    this.cliente_id = Number(this.route.snapshot.paramMap.get('cliente_id')) || 0;
  }

  ngOnInit(): void {
    this.buscarHistoricoMensagens();
    this.socketService.ouvirEvento<any>('mensagemRecebida').subscribe((mensagem) => {
      this.mensagens?.push(mensagem);
    });
  }

  enviarMensagem(): void {
    if (this.novaMensagem) {
      const mensagem = {
        cliente_id: this.cliente_id,
        numero_destino: this.numero_destino,
        is_whatsapp: false,
        texto: this.novaMensagem,
      };

      this.socketService.emitirEvento('enviarMensagem', mensagem);
      this.novaMensagem = '';
    }
  }

  buscarHistoricoMensagens() {
    this.requestService.get<IMensagem[]>('/mensagem').subscribe({
      next: (res) => {
        this.mensagens = res?.body;
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
