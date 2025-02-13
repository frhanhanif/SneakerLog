import { Component, Input } from '@angular/core';
import { Sneaker } from '../../../shared/sneaker.model';
import { SneakerCardComponent } from "../../../components/sneaker-card/sneaker-card.component";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { categories } from '../../../shared/categories.model';

@Component({
  selector: 'app-sneaker-group',
  standalone: true,
  imports: [SneakerCardComponent, RouterModule, CommonModule],
  templateUrl: './sneaker-group.component.html',
  styleUrl: './sneaker-group.component.scss'
})
export class SneakerGroupComponent {

  @Input() sneakers:Sneaker[] = []
  @Input() activeFilter:string = 'All'
  categories = categories;
  isExpanded: { [key: string]: boolean } = {}; // To track which categories are expanded

  groupBy(array: any[], key: string): { [key: string]: any[] } {
    return array.reduce((result: { [key: string]: any[] }, item) => {
      const groupKey = item[key];
      if (!result[groupKey]) {
        result[groupKey] = [];
      }
      result[groupKey].push(item);
      return result;
    }, {});
  }

  getSneakers(groupedSneakers: { [key: string]: any[] }): any[] {
    return Object.values(groupedSneakers);
  }

  getFilteredSneakers() {
    switch (this.activeFilter) {
      case 'Brand':
        this.activeFilter = 'Brand'
        return this.groupBy(this.sneakers, 'brand');
      case 'Category':
        this.activeFilter = 'Category'
        return this.groupBy(this.sneakers, 'category');
      default:
        return this.sneakers;
    }
  }

  filteredSneakersByCategory(category: string) {
    return this.sneakers.filter((sneaker) => sneaker.category === category);
  }

  toggleCategory(category: string) {
    this.isExpanded[category] = !this.isExpanded[category];
  }
}
