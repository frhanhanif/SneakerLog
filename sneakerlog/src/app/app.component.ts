import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { BottomNavComponent } from './components/bottom-nav/bottom-nav.component';
import { AddSneakerComponent } from './components/add-sneaker/add-sneaker.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,BottomNavComponent,AddSneakerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  @ViewChild(AddSneakerComponent) addSneakerModal!: AddSneakerComponent;

  openAddSneakerModal = () => {
    this.addSneakerModal.openModal();
  };
}
