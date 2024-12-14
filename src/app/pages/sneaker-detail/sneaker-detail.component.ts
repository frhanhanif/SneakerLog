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
  targetDistance:number = 500
  price:number = 300000;
  usageCount:number = 0

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

  updateSneaker(){
    this.sneakerService.updateSneaker(this.sneaker);
  }


}
