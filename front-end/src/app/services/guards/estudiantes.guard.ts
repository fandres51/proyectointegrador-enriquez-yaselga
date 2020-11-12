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
            (res, req) => {
                
                this.authService.auth.user.subscribe(
                    user => {
                        //console.log(">>>user: ",user.email, "verif: ",user.emailVerified,"username: ", user.displayName);
                        //console.log("permisos:",this.authService.getPermiso(user.email, 'Estudiantes').subscribe(permisos=>{this.var= permisos}));
                        this.authService.getPermiso(user.email, 'Estudiantes').subscribe(
                            permisos => {
                                console.log(">>>permisos de:",user,"\n estudiantes: ",permisos);
                                if(permisos.length>0)
                                    res(true);
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
            }
        )
    }

}