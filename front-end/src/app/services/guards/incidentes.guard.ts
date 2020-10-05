import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class IncidentesGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

        return new Promise<boolean>(
            (res, req) => {
                this.authService.auth.user.subscribe(
                    user => {
                        this.authService.getPermiso(user.email, 'Incidentes').subscribe(
                            permisos => {
                                if(permisos.length>0)
                                    res(true);
                                else
                                    res(false)
                            }
                        )
                    }
                )
            }
        )
    }

}