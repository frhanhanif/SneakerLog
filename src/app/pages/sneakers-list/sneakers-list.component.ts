import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SneakerService } from '../../shared/sneaker.service';
import { Sneaker } from '../../shared/sneaker.model';
import { RouterModule } from '@angular/router';
import { AddSneakerComponent } from '../../components/add-sneaker/add-sneaker.component';
import { SneakerCardComponent } from '../../components/sneaker-card/sneaker-card.component';
import { ReloadPageComponent } from "../../components/reload-page/reload-page.component";
import {   CdkDrag,
  CdkDragDrop,
  CdkDragHandle,
  CdkDragPlaceholder,
  CdkDropList,
  moveItemInArray, } from "@angular/cdk/drag-drop"
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-sneakers-list',
  standalone: true,
  imports: [SneakerCardComponent, RouterModule, AddSneakerComponent, ReloadPageComponent,
    CdkDropList, CdkDrag, CdkDragPlaceholder, CommonModule, CdkDragHandle
  ],
  templateUrl: './sneakers-list.component.html',
  styleUrl: './sneakers-list.component.scss'
})
export default class SneakersListComponent implements OnInit {
  
  isSneaker: boolean = true
  sneakers:Sneaker[]=[]
  sneakerService = inject(SneakerService)
  isActive = true;
  isSold = false;

  // constructor(private sneakerService: SneakerService) {}
  ngOnInit(): void {
    this.sneakerService.sneakersObservable.subscribe(
      (data)=>{ 
        this.sneakers=data
        console.log(this.sneakers)
      }
    )
  }
  
  async exportData(){
    const allSneakers = this.sneakers
    const blob = new Blob([JSON.stringify(allSneakers, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sneaker-data.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  onDrop(event: CdkDragDrop<Sneaker[]>) {
    moveItemInArray(this.sneakers, event.previousIndex, event.currentIndex);
    this.updateSneakerOrder()
  }

  filteredSneakers(status:string){
    return this.sneakers.filter(data => data.status===status)
  }

  private async updateSneakerOrder() {
    this.sneakers.forEach((sneaker, index) => {
      sneaker.order = index;
    });
    await this.sneakerService.updateSneakerOrder(this.sneakers);
    console.log(this.sneakers)
  }

  toggleActive() {
    this.isActive = !this.isActive
  }

  toggleSold(){
    this.isSold = !this.isSold
  }



}
