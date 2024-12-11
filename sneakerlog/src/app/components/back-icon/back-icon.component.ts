import { Component } from '@angular/core';
import { Location } from '@angular/common';


@Component({
  selector: 'app-back-icon',
  standalone: true,
  imports: [],
  templateUrl: './back-icon.component.html',
  styleUrl: './back-icon.component.scss'
})
export class BackIconComponent {
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
