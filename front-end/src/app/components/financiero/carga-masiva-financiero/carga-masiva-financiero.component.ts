import { Component, Output, EventEmitter } from '@angular/core';
import { AngularFireUploadTask, AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { CsvToFireService } from 'src/app/services/csv-to-fire.service';

@Component({
  selector: 'app-carga-masiva-financiero',
  templateUrl: './carga-masiva-financiero.component.html',
  styleUrls: ['./carga-masiva-financiero.component.scss']
})
export class CargaMasivaFinancieroComponent {

  @Output() cerrarDialog = new EventEmitter();

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
    this.csv2fire.process(file, 'Asociacion/AEIS/Transaccion');
    this.cerrarDialog.emit('cerrar');
  }
}
