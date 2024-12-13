import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BackIconComponent } from '../../components/back-icon/back-icon.component';
import { DeleteSneakerComponent } from '../../components/delete-sneaker/delete-sneaker.component';
import { SaveSneakerComponent } from '../../components/save-sneaker/save-sneaker.component';
import { CircleProgressComponent } from "../../components/circle-progress/circle-progress.component";
import { PriceOverviewComponent } from "../../components/price-overview/price-overview.component";
import { SneakerService } from '../../shared/sneaker.service';


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
  sneaker:any;
  id:number=0;
  percentage:number = 90;
  distance:number = 0;
  targetDistance:number = 500
  price:number = 300000;
  usageCount:number = 0
  activatedRout = inject(ActivatedRoute)
  sneakerService = inject(SneakerService)

  ngOnInit(): void {
      this.activatedRout.paramMap.subscribe(
        (param) => {
          this.id=Number(param.get('sneaker-id'));
          this.sneaker = this.sneakerService.getSneakers().find((data) => data.id === this.id)

      }
    )
    console.log(this.sneaker)
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


}
