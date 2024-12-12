import { Component } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  standalone: true,
  imports: [],
  templateUrl: './circle-progress.component.html',
  styleUrl: './circle-progress.component.scss'
})
export class CircleProgressComponent {

  percentage:number = 70;
  distance:number = 0
}
