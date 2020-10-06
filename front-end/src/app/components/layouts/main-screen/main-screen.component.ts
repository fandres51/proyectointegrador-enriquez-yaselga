import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainScreenComponent implements OnInit {

  icons = ['accessibility_new', 'attach_money', 'store', 'calendar_today', 'account_box', 'description', 'how_to_vote', 'report_problem', 'dns', 'notifications'];
  modulos = ['Estudiantes', 'Financiero', 'Filiales', 'Eventos', 'Autoridades', 'Contratos', 'Elecciones', 'Incidentes', 'Recursos', 'Notificaciones'];
  routes = ['/estudiantes', '/financiero', '/filiales', '/eventos', '/autoridades', '/contratos', '/elecciones', '/incidentes', '/recursos', '/notificaciones'];

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void { }

}
