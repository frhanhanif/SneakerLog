import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SneakerService } from '../../shared/sneaker.service';
import { Sneaker } from '../../shared/sneaker.model';
import { RouterModule } from '@angular/router';
import { AddSneakerComponent } from '../../components/add-sneaker/add-sneaker.component';
import { SneakerCardComponent } from '../../components/sneaker-card/sneaker-card.component';


@Component({
  selector: 'app-sneakers-list',
  standalone: true,
  imports: [SneakerCardComponent,RouterModule,AddSneakerComponent],
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
    console.log(this.sneakers)
  }


}
