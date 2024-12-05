import { Component, Input } from '@angular/core';
import { AddSneakerComponent } from '../add-sneaker/add-sneaker.component';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [AddSneakerComponent],
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.scss'
})
export class BottomNavComponent {
  @Input() onAddSneaker!: () => void;
}
