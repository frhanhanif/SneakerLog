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
    // Define the database schema
    // this.version(1).stores({
    //   sneakers: '++id, brand, model, purchasedPrice, soldPrice, purchasedDate, currentDistance, targetDistance, usageCount, order, isActive', 
    //   // '++id' defines an auto-incrementing primary key
    // });

    // // Populate table reference
    // this.sneakers = this.table('sneakers');

    this.version(2).stores({
      sneakers: '++id, brand, model, purchasedPrice, soldPrice, purchasedDate, currentDistance, targetDistance, usageCount, order, isActive'
    }).upgrade(async (tx) => {
      const sneakers = await tx.table('sneakers').toArray();
      await Promise.all(
        sneakers.map(async (sneaker) => {
          if (sneaker.isActive === undefined) {
            sneaker.isActive = true; // Default value
            await tx.table('sneakers').put(sneaker);
          }
        })
      );
    });
  }
}
