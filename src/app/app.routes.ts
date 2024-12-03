import { Routes } from '@angular/router';
import {MensagensComponent} from "./presentation/view/pages/mensagens/mensagens.component";
import {LoginComponent} from "./presentation/view/pages/login/login.component";

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'chat/:cliente_id',
    component: MensagensComponent,
  },
];
