import { Component } from '@angular/core';

@Component({
  selector: 'app-reload-page',
  standalone: true,
  imports: [],
  templateUrl: './reload-page.component.html',
  styleUrl: './reload-page.component.scss'
})
export class ReloadPageComponent {

reload() {
  window.location.reload()
}

}
