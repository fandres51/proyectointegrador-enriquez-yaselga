import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AsociacionService } from '../asociacion.service';
import { AuthService } from '../auth.service';
import { AutoridadesService } from '../autoridades.service';

@Injectable()
export class AjustesGuard implements CanActivate {

    constructor(
        private readonly authService: AuthService,
        private readonly autoridadesService: AutoridadesService,
        private readonly asociacionService: AsociacionService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        
        return new Promise<boolean>(
            (res, req) => {
                this.authService.auth.user.subscribe(
                    user => {
                        this.asociacionService.getAsociacion().subscribe(
                            aso => {
                                this.autoridadesService.getAutoridad('Presidente', aso.AsociacionActual).subscribe(
                                    presi => {
                                        if(user.email === presi.CorreoInstitucional)
                                            res(true)
                                        else
                                            res(false)
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
                    },
                    error => {
                      console.error(error);
                    }
                )
            }
        )
    }

}