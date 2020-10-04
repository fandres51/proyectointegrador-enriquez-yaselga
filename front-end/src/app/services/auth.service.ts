import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  user: auth.UserCredential;

  constructor(
    public auth: AngularFireAuth,
    public afs: AngularFirestore
  ) { }

  login() {
    this.auth.signInWithPopup(new auth.OAuthProvider('microsoft.com'));
    
  }

  getPermiso(email: string, modulo: string) {
    return this.afs.collection('Asociacion/AEIS/Permisos', ref => ref.where('email','==',email).where('modulo','==',modulo)).valueChanges();
  }

  logOut() {
    this.auth.signOut();
  }

}
