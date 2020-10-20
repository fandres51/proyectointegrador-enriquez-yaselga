import { Component, Input, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/models/estudiante';
import { AuthService } from 'src/app/services/auth.service';
import { EstudiantesService } from 'src/app/services/estudiantes.service';

@Component({
  selector: 'app-estudiantes-main',
  templateUrl: './estudiantes-main.component.html',
  styleUrls: ['./estudiantes-main.component.scss']
})
export class EstudiantesMainComponent implements OnInit {

  public estudiantes: Estudiante[] = [];

  constructor(
    public EstudiantesService: EstudiantesService,
    public authService: AuthService,
  ) { }

  ngOnInit() { }

  cargaMasiva(event: FileList) {

    this.authService.auth.user.subscribe(
      user => {
        this.authService.getPermiso(user.email, 'Estudiantes_new').subscribe(
          permiso => {
            if (permiso.length > 0) {
             
              const file = event.item(0);
              if (file.type.split('/')[1] !== 'csv') {
                console.error('Unsupported file type!!');
              }
              this.EstudiantesService.cargaMasivaEstudiantes(file).then(
                eni => {
                  if(eni.length > 0) {
                    let registros: string = '';
                    eni.forEach( n => {
                      registros = registros + n + '\n';
                    })
                    alert('Registros no ingresados: \n' + registros);
                  }
                }
              );
              
            }
            else
              alert('Usted no tiene permiso para realizar esa acción');
          }
        )
      }
    )
  }
}
