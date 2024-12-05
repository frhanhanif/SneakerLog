import { Injectable } from '@angular/core';
import { Sneaker } from './sneaker.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SneakerService {

  private localStorageKey = 'sneakers';
  private sneakersSubject: BehaviorSubject<Sneaker[]>;
  sneakersObservable: Observable<Sneaker[]>;
  
  constructor() {
    //Initialize data in constructor
    const initialData = this.getSneakersFromLocalStorage();
    this.sneakersSubject = new BehaviorSubject<Sneaker[]>(initialData);
    this.sneakersObservable = this.sneakersSubject.asObservable();
   }

  private getSneakersFromLocalStorage(): Sneaker[] {
    const sneakers = localStorage.getItem(this.localStorageKey);
    return sneakers ? JSON.parse(sneakers) : [];
  }

  getSneakers(): Sneaker[] {
    return this.sneakersSubject.getValue();
  }

  // Add a new sneaker to Local Storage
  addSneaker(newSneaker: Sneaker): void {
    const sneakers = this.getSneakers();
    newSneaker.id = sneakers.length > 0 ? 
    sneakers[sneakers.length - 1].id + 1 : 1; // Assign ID
    sneakers.push(newSneaker);
    localStorage.setItem(this.localStorageKey, JSON.stringify(sneakers));

    //Notify change to subject
    this.sneakersSubject.next(sneakers)
  }
  
}
