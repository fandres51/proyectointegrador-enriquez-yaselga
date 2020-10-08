import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @Output() elementToSearch = new EventEmitter();
  elementoABuscar: string;

  constructor() { }

  ngOnInit(): void { }

  enviarElemento() {
    this.elementToSearch.emit(this.elementoABuscar);
  }
}
