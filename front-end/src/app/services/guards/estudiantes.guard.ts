import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Permiso } from 'src/app/models/permiso';
import { AuthService } from '../auth.service';

@Injectable()
export class EstudiantesGuard implements CanActivate {
    var:Permiso[];

    constructor(
        private readonly authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return new Promise<boolean>(
            (res) => {
                this.authService.auth.user.subscribe(
                    user => {
                        this.authService.getPermiso(user.email, 'Estudiantes').subscribe(
                            permisos => {
                                if(permisos.length>0) {
                                    res(true);
                                } else {
                                    res(true)
                                }
                            },
                            error => {
                              console.error(error);
                            }
                        )
                    },
                    error => {
                      console.error(error);
                    }
                )
            }
        )
    }

}