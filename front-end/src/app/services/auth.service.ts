import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { auth } from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor (
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState;
  }

  async microsoftSignIn() {
    const provider = new auth.OAuthProvider('microsoft.com');
    try {
      const credential = await firebase.auth().signInWithPopup(provider);
      console.log('Credencial: ', credential);
      console.log('User: ', this.user$);
    } catch (e) {
      console.error('Error: ',e);
    }
  }

  async signOut() {
    await firebase.auth().signOut();
    return this.router.navigate(['/']); 
  }
}
