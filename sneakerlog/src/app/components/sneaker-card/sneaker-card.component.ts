import { Component, Input } from '@angular/core';
import { Sneaker } from '../../shared/sneaker.model';

@Component({
  selector: 'app-sneaker-card',
  standalone: true,
  imports: [],
  templateUrl: './sneaker-card.component.html',
  styleUrl: './sneaker-card.component.scss'
})
export class SneakerCardComponent {

  @Input() sneaker!: Sneaker;

  calculateProgress(currentDistance: number, targetDistance: number): number {
    if (targetDistance === 0) {
      return 0; // Prevent division by zero
    }
    const progress = (currentDistance / targetDistance) * 100;
    return Math.min(progress, 100); // Cap the progress at 100%
  }
}
