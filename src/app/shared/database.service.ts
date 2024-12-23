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
    this.version(7).stores({
      sneakers: '++id, brand, model, purchasedPrice, soldPrice, purchasedDate, currentDistance, targetDistance, usageCount, category',
    });
  
      this.sneakers = this.table('sneakers');

  }
}
// constructor() {
//   super('SneakerDatabase');

//   // Define the schema for version 6
//   this.version(6).stores({
//     sneakers: '++id, brand, model, purchasedPrice, soldPrice, purchasedDate, currentDistance, targetDistance, usageCount, order, status',
//   }).upgrade(async (transaction) => {
//     const sneakersTable = transaction.table('sneakers');
//     const sneakers = await sneakersTable.toArray();

//     // Ensure all records are re-saved with the new structure
//     await Promise.all(
//       sneakers.map(async (sneaker) => {
//         // Re-save the record to include the new schema structure
//         await sneakersTable.put(sneaker);
//       })
//     );
//   });

//   this.sneakers = this.table('sneakers');
// }
// }