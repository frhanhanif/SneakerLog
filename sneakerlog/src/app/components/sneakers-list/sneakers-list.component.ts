import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SneakerComponent } from './sneaker/sneaker.component';
import { SneakerService } from '../../shared/sneaker.service';
import { Sneaker } from '../../shared/sneaker.model';
import { RouterModule } from '@angular/router';
import { AddSneakerComponent } from '../add-sneaker/add-sneaker.component';
import { BottomNavComponent } from '../bottom-nav/bottom-nav.component';

@Component({
  selector: 'app-sneakers-list',
  standalone: true,
  imports: [SneakerComponent,RouterModule,AddSneakerComponent],
  templateUrl: './sneakers-list.component.html',
  styleUrl: './sneakers-list.component.scss'
})
export default class SneakersListComponent implements OnInit {
  
  isSneaker: boolean = true
  sneakers:Sneaker[]=[]
  sneakerService = inject(SneakerService)

  // constructor(private sneakerService: SneakerService) {}
  ngOnInit(): void {
    this.sneakerService.sneakersObservable.subscribe(
      (data)=>{ 
        this.sneakers=data
      }
    )
    console.log(this.sneakerService.getSneakers())

  }


}
