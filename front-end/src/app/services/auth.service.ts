import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Permiso } from '../models/permiso';

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

  getPermiso(email: string, modulo: string): Observable<Permiso[]> {
    return this.afs.collection('Asociacion/AEIS/Permisos', ref => ref.where('email','==',email).where('modulo','==',modulo)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Permiso;
        data.id = a.payload.doc.id;
        return data;
      }))
    )
  }

  getPermisos(email: string): Observable<Permiso[]> {
    return this.afs.collection('Asociacion/AEIS/Permisos', ref => ref.where('email','==',email)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Permiso;
        data.id = a.payload.doc.id;
        return data;
      }))
    )
  }
  
  createPermiso(permiso: Permiso) {
    this.afs.collection('Asociacion/AEIS/Permisos').add(permiso);
  }

  updatePermiso(permiso: Permiso) {
    this.afs.collection('Asociacion/AEIS/Permisos').doc(permiso.id).update(permiso);
  }

  deletePermiso(permiso: Permiso) {
    this.afs.collection('Asociacion/AEIS/Permisos').doc(permiso.id).delete();
  }

  logOut() {
    this.auth.signOut();
  }

}
