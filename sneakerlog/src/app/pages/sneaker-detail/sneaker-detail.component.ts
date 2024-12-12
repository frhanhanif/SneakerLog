import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackIconComponent } from '../../components/back-icon/back-icon.component';
import { DeleteSneakerComponent } from '../../components/delete-sneaker/delete-sneaker.component';
import { SaveSneakerComponent } from '../../components/save-sneaker/save-sneaker.component';
import { CircleProgressComponent } from "../../components/circle-progress/circle-progress.component";
import { PriceOverviewComponent } from "../../components/price-overview/price-overview.component";


@Component({
  selector: 'app-sneaker-detail',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, BackIconComponent,
    DeleteSneakerComponent, SaveSneakerComponent, CircleProgressComponent,
    PriceOverviewComponent
],
  templateUrl: './sneaker-detail.component.html',
  styleUrl: './sneaker-detail.component.scss'
})
export default class SneakerDetailComponent implements OnInit {
  id:number=0;
  percentage:number = 80;
  distance:number = 0;
  price:number = 300000;
  activatedRout = inject(ActivatedRoute)

  ngOnInit(): void {
      this.activatedRout.paramMap.subscribe(
        (param) => {
          this.id=Number(param.get('sneaker-id'))
      }
    )
    console.log(this.id)
  }
  usageCount:number = 0
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
  percentageToRotate(percentage: number): number {
    return (percentage / 100) * 360;
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
