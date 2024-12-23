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
import { DatabaseService } from '../../shared/database.service';


@Component({
  selector: 'app-sneaker-detail',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule, BackIconComponent,
    DeleteSneakerComponent, CircleProgressComponent,
    PriceOverviewComponent
],
  templateUrl: './sneaker-detail.component.html',
  styleUrl: './sneaker-detail.component.scss'
})
export default class SneakerDetailComponent implements OnInit {
  sneaker:any;
  id!:number;
  percentage:number = 0;
  price:number = 300000;

  activatedRout = inject(ActivatedRoute)
  sneakerService = inject(SneakerService)
  db = inject(DatabaseService)

  ngOnInit(): void {
      this.activatedRout.paramMap.subscribe(
        async (param) => {
          this.id=Number(param.get('sneaker-id'));
          this.sneaker = await this.db.sneakers.get(this.id); 
          this.calculatePercentage()
      }
    )
    console.log(this.sneaker)
  }

  incrUsageCount(){
    if(this.sneaker && this.sneaker.usageCount<999){
      this.sneaker.usageCount++
      this.updateSneaker()
    }
  }

  inputUsage(){
    if (this.sneaker) {
      if (this.sneaker.usageCount > 999) {
        this.sneaker.currentDistance = 999;
      } else if (this.sneaker.usageCount < 0) {
        this.sneaker.currentDistance = 0;
      }

      this.sneakerService.updateSneaker(this.sneaker);
      this.calculatePercentage()
    }
  }

  decrUsageCount(){
    if(this.sneaker && this.sneaker.usageCount>0){
      this.sneaker.usageCount--
      this.updateSneaker()
    }
  }
  incrDistance(){
    if(this.sneaker && this.sneaker.currentDistance<9999){
      this.sneaker.currentDistance++
      this.updateSneaker()
      this.calculatePercentage()
    }
  }

  decrDistance(){
    if(this.sneaker && this.sneaker.currentDistance>0){
      this.sneaker.currentDistance--
      this.updateSneaker()
      this.calculatePercentage()
    }
  }

  calculatePercentage(){
    this.percentage = this.sneaker.currentDistance > this.sneaker.targetDistance ? 100 :
     Math.round((this.sneaker.currentDistance/this.sneaker.targetDistance) * 100);
  }

  setTargetDistance(): void {
    const wellSpentThreshold = 4999; // Define the PricePerKM threshold
    
    if (this.sneaker.purchasedPrice > 0) {
      // Calculate the target distance to achieve a PricePerKM < 5000
      this.sneaker.targetDistance = Math.ceil(this.sneaker.purchasedPrice / wellSpentThreshold);
      this.sneakerService.updateSneaker(this.sneaker);
      this.calculatePercentage()
    }
  }

  inputDistance(){
    if (this.sneaker) {
      if (this.sneaker.currentDistance > 9999) {
        this.sneaker.currentDistance = 9999;
      } else if (this.sneaker.currentDistance < 0) {
        this.sneaker.currentDistance = 0;
      }

      this.sneakerService.updateSneaker(this.sneaker);
      this.calculatePercentage()
    }
  }

  targetDistance(){
    if (this.sneaker) {
      if (this.sneaker.targetDistance > 9999) {
        this.sneaker.targetDistance = 9999;
      } else if (this.sneaker.targetDistance < 0) {
        this.sneaker.targetDistance = 0;
      }
      this.sneakerService.updateSneaker(this.sneaker);
      this.calculatePercentage()
    }
  }

 setSold(){
    this.sneaker.status = 'sold'
    this.sneaker.order = 9999;
    this.sneakerService.updateSneaker(this.sneaker)   
    console.log(`Sneaker with ID ${this.id} status changed to 'sold'`)
  }

  updateSneaker(){
    this.sneakerService.updateSneaker(this.sneaker);
  }


}
