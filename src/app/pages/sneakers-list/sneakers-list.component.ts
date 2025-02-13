import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { SneakerService } from '../../shared/sneaker.service';
import { Sneaker } from '../../shared/sneaker.model';
import { RouterModule } from '@angular/router';
import { AddSneakerComponent } from '../../components/add-sneaker/add-sneaker.component';
import { SneakerCardComponent } from '../../components/sneaker-card/sneaker-card.component';
import { ReloadPageComponent } from "../../components/reload-page/reload-page.component";
import { CommonModule } from '@angular/common';
import { GroupFilterComponent } from '../../components/group-filter/group-filter.component';
import { SneakerGroupComponent } from './sneaker-group/sneaker-group.component';
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-sneakers-list',
  standalone: true,
  imports: [RouterModule, AddSneakerComponent, ReloadPageComponent,
    CommonModule, GroupFilterComponent, SneakerGroupComponent, FormsModule
  ],
  templateUrl: './sneakers-list.component.html',
  styleUrl: './sneakers-list.component.scss'
})
export default class SneakersListComponent implements OnInit {
  
  isSneaker: boolean = true
  sneakers: Sneaker[] = []; // Full dataset from IndexedDB
  filteredSneakers: Sneaker[] = []; // Holds the filtered list for search
  sneakerService = inject(SneakerService)
  activeFilter:string = 'All'
  searchTerm: string = ''; // Holds search input value


  // constructor(private sneakerService: SneakerService) {}
  ngOnInit(): void {
    this.sneakerService.sneakersObservable.subscribe(
      (data)=>{ 
        this.sneakers=data
        this.filteredSneakers = data; // Initialize with all sneakers
        
      }
    )
  }

  onSearch(searchTerm:string) {
    console.log(this.searchTerm)
    this.sneakerService.searchSneaker(this.searchTerm).then((filtered) => {
      this.filteredSneakers = filtered;
      console.log(this.filteredSneakers)
    });
  }

  onFilterChange(filter:string){
    this.activeFilter=filter
    console.log('event : ', filter)
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



}