import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public estadoMenu:boolean = false;

  constructor(
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  mostrarMenu() {
    this.estadoMenu = !this.estadoMenu;
  }

  logout() {
    this.auth.signOut();
  }

}
