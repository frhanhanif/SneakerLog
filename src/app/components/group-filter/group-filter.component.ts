import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-group-filter',
  standalone: true,
  imports: [],
  templateUrl: './group-filter.component.html',
  styleUrl: './group-filter.component.scss'
})
export class GroupFilterComponent {
  isToggleDrop = false;
  filter = 'All'
  
  @Output() filterChange = new EventEmitter<'All' | 'Brand'|'Category'>();

  toggleDrop(){
    this.isToggleDrop = !this.isToggleDrop
  }

  changeFilter(filter: 'All' | 'Brand' | 'Category'){
    this.filter = filter
    this.filterChange.emit(filter);
    this.isToggleDrop = false
  }
}
