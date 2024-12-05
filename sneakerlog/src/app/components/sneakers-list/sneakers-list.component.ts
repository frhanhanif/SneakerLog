import { Component, inject, OnInit } from '@angular/core';
import { SneakerComponent } from '../sneaker/sneaker.component';
import { SneakerService } from '../../shared/sneaker.service';
import { Sneaker } from '../../shared/sneaker.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sneakers-list',
  standalone: true,
  imports: [SneakerComponent,RouterModule],
  templateUrl: './sneakers-list.component.html',
  styleUrl: './sneakers-list.component.scss'
})
export default class SneakersListComponent implements OnInit {
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

  isSneaker: boolean = true
}
