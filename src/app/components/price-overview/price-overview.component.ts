import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SneakerService } from '../../shared/sneaker.service';

@Component({
  selector: 'app-price-overview',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule],
  templateUrl: './price-overview.component.html',
  styleUrl: './price-overview.component.scss'
})
export class PriceOverviewComponent implements OnInit {
  @Input() sneaker:any

  sneakerService = inject(SneakerService)

  ngOnInit(): void {
      console.log(this.sneaker)
  }
  get pricePerKM(): number {
    return this.sneaker.currentDistance === 0 ? this.sneaker.purchasedPrice : this.sneaker.purchasedPrice / this.sneaker.currentDistance;
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
