import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { SneakerService } from '../../shared/sneaker.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-delete-sneaker',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './delete-sneaker.component.html',
  styleUrl: './delete-sneaker.component.scss'
})
export class DeleteSneakerComponent {

  @Input() id:number = 0;
  sneakerService = inject(SneakerService)
  router = inject(Router);
  isDeleteModalOpen = false;

  // Event to notify parent about the deletion
  @Output() sneakerDeleted = new EventEmitter<void>();

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }

  deleteSneakers() {
    console.log(this.id)
    this.sneakerService.deleteSneaker(this.id);
    this.router.navigate(['/'])
  }
}
