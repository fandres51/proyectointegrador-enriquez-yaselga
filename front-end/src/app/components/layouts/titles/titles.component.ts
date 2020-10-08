import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titles',
  templateUrl: './titles.component.html',
  styleUrls: ['./titles.component.scss']
})
export class TitlesComponent implements OnInit {

  @Input() text: string = "";
  @Input() regresarA: string = "";

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { }

  regresar() {
    this.router.navigateByUrl(this.regresarA);
  }

}
