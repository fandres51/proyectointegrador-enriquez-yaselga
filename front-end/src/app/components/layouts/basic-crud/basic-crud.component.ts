import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-basic-crud',
  templateUrl: './basic-crud.component.html',
  styleUrls: ['./basic-crud.component.scss']
})
export class BasicCrudComponent implements OnInit {

  @Input() listOfElements: string[];
  @Output() selectedItem = new EventEmitter();
  @Output() newItem = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  nuevoElemento() {
    this.newItem.emit('nuevo');
  }

  buscar(elementToSearch: string) {
    this.listOfElements = this.listOfElements.filter(
      n => {
        return n.search(elementToSearch) != -1;
      }
    )
  }

  sendSelectedItem(selectedElement: string) {
    this.selectedItem.emit(selectedElement);
  }

}
