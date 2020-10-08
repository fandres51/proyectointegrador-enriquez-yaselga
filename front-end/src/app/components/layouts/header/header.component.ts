import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public estadoMenu:boolean = false;
  public nombreUsuario: string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authService.auth.user.subscribe(
      user => {
        this.nombreUsuario = user.displayName;
      },
      error => {
        console.error(error);
      }
    )
  }

  mostrarMenu() {
    this.estadoMenu = !this.estadoMenu;
  }

  logout() {
    this.authService.logOut();
  }

}
