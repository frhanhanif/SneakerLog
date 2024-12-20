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
  isDropdown = false;

  // constructor(private sneakerService: SneakerService) {}
  ngOnInit(): void {
    this.sneakerService.sneakersObservable.subscribe(
      (data)=>{ 
        this.sneakers=data
        console.log(this.sneakers)
      }
    )
  }

  onDrop(event: CdkDragDrop<Sneaker[]>) {
    moveItemInArray(this.sneakers, event.previousIndex, event.currentIndex);
    this.updateSneakerOrder()
  }

  private async updateSneakerOrder() {
    this.sneakers.forEach((sneaker, index) => {
      sneaker.order = index;
    });
    await this.sneakerService.updateSneakerOrder(this.sneakers);
    console.log(this.sneakers)
  }

  toggleDropdown() {
    this.isDropdown = !this.isDropdown
  }



}
