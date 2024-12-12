import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-sneaker',
  standalone: true,
  imports: [],
  templateUrl: './delete-sneaker.component.html',
  styleUrl: './delete-sneaker.component.scss'
})
export class DeleteSneakerComponent {
  isDeleteModalOpen = false;

  // Event to notify parent about the deletion
  @Output() sneakerDeleted = new EventEmitter<void>();

  openDeleteModal() {
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal() {
    this.isDeleteModalOpen = false;
  }
}
