import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icon-box',
  templateUrl: './icon-box.component.html',
  styleUrls: ['./icon-box.component.scss']
})
export class IconBoxComponent implements OnInit {

  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() route: string = '/';

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  navigate() {
    this.router.navigateByUrl(this.route);
  }

}
