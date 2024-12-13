import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-distance-counter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './distance-counter.component.html',
  styleUrl: './distance-counter.component.scss'
})
export class DistanceCounterComponent {
  distance:number = 0;
  incrDistance(){
    if(this.distance<999){
      this.distance++
    }

  }

  decrDistance(){
    if(this.distance>0){
      this.distance--
    }
  }
}
