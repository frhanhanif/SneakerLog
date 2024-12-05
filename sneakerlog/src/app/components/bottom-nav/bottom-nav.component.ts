import { Component, Input } from '@angular/core';
import { AddSneakerComponent } from '../add-sneaker/add-sneaker.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [AddSneakerComponent,RouterModule],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent {
  @Input() onAddSneaker!: () => void;
}
