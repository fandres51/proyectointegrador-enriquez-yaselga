import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-eventos-info',
  templateUrl: './eventos-info.component.html',
  styleUrls: ['./eventos-info.component.scss']
})
export class EventosInfoComponent implements OnInit {

  public evento: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.evento = params['id'];
    })
  }
}
