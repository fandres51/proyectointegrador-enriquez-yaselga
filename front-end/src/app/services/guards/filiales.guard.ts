import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class FilialesGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return new Promise<boolean>(
            (res, req) => {
                this.authService.auth.user.subscribe(
                    user => {
                        this.authService.getPermiso(user.email, 'Filiales').subscribe(
                            permisos => {
                                if(permisos.length>0)
                                    res(true);
                                else {
                                    alert('Usted no tiene permisos para acceder a este módulo');
                                    res(false)
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