import { Injectable } from '@angular/core';
import Dexie, { Table } from 'dexie';
import { Sneaker } from './sneaker.model';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService extends Dexie {
  sneakers!: Table<Sneaker, number>; // Define sneakers table with primary key as number

  constructor() {
    super('SneakerDatabase');
    console.log('check dbservice')
    // Define the database schema
    // this.version(1).stores({
    //   sneakers: '++id, brand, model, purchasedPrice, soldPrice, purchasedDate, currentDistance, targetDistance, usageCount, order, isActive', 
    //   // '++id' defines an auto-incrementing primary key
    // });

    // // Populate table reference
    // this.sneakers = this.table('sneakers');

    this.version(5).stores({
      sneakers: '++id, brand, model, purchasedPrice, soldPrice, purchasedDate, currentDistance, targetDistance, usageCount, order, status'
  })

      this.sneakers = this.table('sneakers');

  
    
  }
}
