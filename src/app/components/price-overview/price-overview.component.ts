import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SneakerService } from '../../shared/sneaker.service';
import { PriceFormatDirective } from '../../shared/price-format.directive';

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
  updateSneaker(){
    this.sneakerService.updateSneaker(this.sneaker)
  }

  get pricePerKM(): number {
    return this.sneaker.currentDistance === 0 ? this.sneaker.purchasedPrice : this.sneaker.purchasedPrice / this.sneaker.currentDistance;
  }

  getPricePerKMCategory(price:number): string {
    if (price < 5000) {
      return 'Well Spent';
    } else if (price < 10000) {
      return 'Decent';
    } else {
      return 'Overpriced';
    }
  }
  
  getPricePerKMCategoryClass(price:number): string {
    if (price < 5000) {
      return 'bg-green-600 text-white';
    } else if (price< 10000) {
      return 'bg-yellow-600 text-white';
    } else {
      return 'bg-red-600 text-white';
    }
  }

  setTargetDistance(): void {
    const wellSpentThreshold = 4999; // Define the PricePerKM threshold
    
    if (this.sneaker.purchasedPrice > 0) {
      // Calculate the target distance to achieve a PricePerKM < 5000
      this.sneaker.targetDistance = Math.ceil(this.sneaker.purchasedPrice / wellSpentThreshold);
    }
  }

  get actualPrice(): number {
    const diff = this.sneaker.purchasedPrice - this.sneaker.soldPrice;
    return diff >= 0 ? diff : 0; // Show cost only if not earning profit
  }

  get profit(): number {
    return this.sneaker.soldPrice > this.sneaker.purchasedPrice
      ? this.sneaker.soldPrice - this.sneaker.purchasedPrice
      : 0;
  }

  // Calculates price per KM after selling the sneaker
  get pricePerKMAfterSold(): number {
    if (this.profit > 0) {
      return 0; // Profit means no cost per KM
    }
    const actualPrice = this.actualPrice;
    return this.sneaker.currentDistance > 0
      ? actualPrice / this.sneaker.currentDistance
      : 0;
  }
  
  
}
