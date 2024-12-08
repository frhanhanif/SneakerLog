import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sneaker-detail',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './sneaker-detail.component.html',
  styleUrl: './sneaker-detail.component.scss'
})
export default class SneakerDetailComponent {
  percentage:number = 80;
  usageCount:number = 0
  distance:number = 0;
  price:number = 300000;
  percentageToRotate(percentage: number): number {
    return (percentage / 100) * 360;
  }

  incrUsageCount(){
    if(this.usageCount<999){
      this.usageCount++
    }
  }

  decrUsageCount(){
    if(this.usageCount>0){
      this.usageCount--
    }

  }

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

  updateDistance(event: any) {
    const inputElement = event.target as HTMLInputElement;
    const value = parseInt(inputElement.value, 10);
  
    // Only update usageCount if value is valid
    if (!isNaN(value) && value >= 0 && value <= 999) {
      this.distance = value;
    }
  }

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
