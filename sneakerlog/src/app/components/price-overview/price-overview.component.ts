import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-price-overview',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './price-overview.component.html',
  styleUrl: './price-overview.component.scss'
})
export class PriceOverviewComponent {
  distance:number = 0;
  price:number = 30000;
  get pricePerKM(): number {
    return this.distance === 0 ? this.price : this.price / this.distance;
  }

  get pricePerKMCategory(): string {
    if (this.pricePerKM < 5000) {
      return 'Well Spent';
    } else if (this.pricePerKM < 10000) {
      return 'Decent';
    } else {
      return 'Overpriced';
    }
  }
  
  get pricePerKMCategoryClass(): string {
    if (this.pricePerKM < 5000) {
      return 'bg-green-600 text-white';
    } else if (this.pricePerKM < 10000) {
      return 'bg-yellow-600 text-white';
    } else {
      return 'bg-red-600 text-white';
    }
  }
}