import { Component } from '@angular/core';
import { AddSneakerComponent } from '../add-sneaker/add-sneaker.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AddSneakerComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
