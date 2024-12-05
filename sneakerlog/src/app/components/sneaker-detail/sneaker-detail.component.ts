import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sneaker-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sneaker-detail.component.html',
  styleUrl: './sneaker-detail.component.scss'
})
export default class SneakerDetailComponent {
  percentage = 100;
  percentageToRotate(percentage: number): number {
    return (percentage / 100) * 360;
  }
}
