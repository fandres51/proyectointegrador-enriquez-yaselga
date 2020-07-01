import { Component } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { CsvToFireService } from 'src/app/services/csv-to-fire.service';

@Component({
  selector: 'app-carga-masiva',
  templateUrl: './carga-masiva.component.html',
  styleUrls: ['./carga-masiva.component.scss']
})
export class CargaMasivaComponent {

  message = 'Uploading';
  showMessage: boolean = false;
  task: AngularFireUploadTask;
  percentage: Observable<number>;
  snapshot: Observable<any>;
  downloadURL: Observable<string>;
  isHovering: boolean;
  isUploading: boolean;
  isUploaded: boolean;

  constructor(private storage: AngularFireStorage, private csv2fire: CsvToFireService) {
    this.isUploading = false;
    this.isUploaded = false;
  }

  startUpload(event: FileList) {

    const file = event.item(0);

    if (file.type.split('/')[1] !== 'csv') {
      console.error('Unsupported file type!!');
    }

    this.isUploading = true;
    this.isUploaded = false;
    this.csv2fire.process(file, 'Asociacion/AEIS/Persona');

  }
}


