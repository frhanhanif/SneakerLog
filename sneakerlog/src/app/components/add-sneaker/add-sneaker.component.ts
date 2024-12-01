import { Component } from '@angular/core';
import {CommonModule} from '@angular/common'

@Component({
  selector: 'app-add-sneaker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-sneaker.component.html',
  styleUrl: './add-sneaker.component.scss'
})
export class AddSneakerComponent {

  brands = [
    { value: '', label: 'Select Brand' },
    { value: 'Adidas', label: 'Adidas' },
    { value: 'Nike', label: 'Nike' },
    { value: 'Asics', label: 'Asics' },
    { value: 'New Balance', label: 'New Balance' },
    { value: 'Brooks', label: 'Brooks' },
    { value: 'Hoka', label: 'Hoka' },
    { value: 'Puma', label: 'Puma' },
    { value: 'Converse', label: 'Converse' },
    { value: 'Vans', label: 'Vans' },
    { value: 'Other', label: 'Other' },
  ];

  selectedBrand: string = '';

  isModal : boolean = false

  addSneakerModal(){
    this.isModal = !this.isModal;
  }

  closeModal(){
    this.isModal = false
  }

  onBackdropClick(event: MouseEvent) {
    const modalContent = document.getElementById('modal-content');
    if (modalContent && !modalContent.contains(event.target as Node)) {
      this.closeModal();
    }
  }

  submitForm(): void {
    console.log('Selected Brand:', this.selectedBrand);
    // Additional logic can go here
  }
}
