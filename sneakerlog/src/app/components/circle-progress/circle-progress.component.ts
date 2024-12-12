import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-circle-progress',
  standalone: true,
  imports: [],
  templateUrl: './circle-progress.component.html',
  styleUrl: './circle-progress.component.scss'
})
export class CircleProgressComponent {

  @Input() percentage:number = 0;
  distance:number = 0
}
