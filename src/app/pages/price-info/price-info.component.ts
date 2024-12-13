import { Component } from '@angular/core';
import { BackIconComponent } from '../../components/back-icon/back-icon.component';

@Component({
  selector: 'app-price-info',
  standalone: true,
  imports: [BackIconComponent],
  templateUrl: './price-info.component.html',
  styleUrl: './price-info.component.scss'
})
export default class priceInfoComponent {
}
