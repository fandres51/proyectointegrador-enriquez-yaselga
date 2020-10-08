import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
   
  @Input() list: string[] = [];
  @Output() selectedItem = new EventEmitter();

  constructor() { }

  ngOnInit(): void { }

  emitItem(itemSelected: string) {
    this.selectedItem.emit(itemSelected);
  }

}
