import { Injectable } from '@angular/core';
import { Sneaker } from './sneaker.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatabaseService } from './database.service';

@Injectable({
  providedIn: 'root'
})
export class SneakerService {

  private sneakersSubject: BehaviorSubject<Sneaker[]>;
  sneakersObservable: Observable<Sneaker[]>;
  
  constructor(private db: DatabaseService) {
    this.sneakersSubject = new BehaviorSubject<Sneaker[]>([]);
    this.sneakersObservable = this.sneakersSubject.asObservable();
    // Load initial data from IndexedDB
    this.loadSneakers();
   }

   private async loadSneakers() {
    const sneakers = await this.db.sneakers.toArray();
    this.sneakersSubject.next(sneakers);
  }

  async getSneakers(): Promise<Sneaker[]> {
    return this.db.sneakers.toArray();
  }

  async searchSneaker(query: string): Promise<Sneaker[]> {
    if (!query.trim()) {
      return this.db.sneakers.toArray(); // Return all if query is empty
    }
    
    const sneakers = await this.db.sneakers.toArray();
    return sneakers.filter(sneaker =>
      sneaker.model.toLowerCase().includes(query.toLowerCase()) ||
      sneaker.brand.toLowerCase().includes(query.toLowerCase())
    );
  }

  async updateSneakerSubject() {
    const updatedSneakers = await this.db.sneakers.toArray();
    this.sneakersSubject.next(updatedSneakers);
  }

  async addSneaker(newSneaker: Sneaker): Promise<void> {
    try {
      // Assign ID if not provided
      const sneakers = await this.db.sneakers.toArray();
      newSneaker.id = sneakers.length > 0 ? sneakers[sneakers.length - 1].id + 1 : 1;
      await this.db.sneakers.add(newSneaker);
  
      // Emit updated state
      this.updateSneakerSubject()
    } catch (error) {
      console.error('Error adding sneaker:', error);
    }
  }

  async updateSneaker(sneaker:Sneaker){
    try {
      await this.db.sneakers.put(sneaker)
      this.updateSneakerSubject()
    } catch (error) {
      console.log('Error updating sneaker =>',error)
    }
  }

  async updateSneakerOrder(sneakers: Sneaker[]) {
    await this.db.sneakers.bulkPut(sneakers);
  }

  async deleteSneaker(id:number){
    try {
      await this.db.sneakers.delete(id)
      this.updateSneakerSubject()
    } catch (error) {
      console.log('Error deleting sneaker =>', error)
    }
  }
  

}
