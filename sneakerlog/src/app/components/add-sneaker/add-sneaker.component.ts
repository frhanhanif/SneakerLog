import { Component, inject } from '@angular/core';
import {CommonModule} from '@angular/common';
import { Sneaker } from '../../shared/sneaker.model'
import { SneakerService } from '../../shared/sneaker.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-sneaker',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-sneaker.component.html',
  styleUrl: './add-sneaker.component.scss'
})
export class AddSneakerComponent {

  sneakerForm : FormGroup;
  constructor(private fb:FormBuilder, private sneakerService:SneakerService){
    this.sneakerForm = this.fb.group({
      id:[null],
      brand:['', Validators.required],
      model:['', Validators.required],
      purchasedPrice:[0, [Validators.required,Validators.min(0)]],
      purchasedDate:[''],
      currentDistance:[0,Validators.min(0)],
      targetDistance:[300,Validators.min(1)],
      usageCount:[0,Validators.min(0)],
    })
  }

  private getDefaultFormValues() {
    return {
      id: null,
      brand: '',
      model: '',
      purchasedPrice: 0,
      purchasedDate: '',
      currentDistance: 0,
      targetDistance: 300,
      usageCount: 0,
    };
  }

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

  openModal(){
    this.isModal = true;
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
    if(this.sneakerForm.valid) {
      const newSneaker = this.sneakerForm.value;
      this.sneakerService.addSneaker(newSneaker);
      console.log(newSneaker)
      this.sneakerForm.reset(this.getDefaultFormValues())
      this.closeModal()
    } 
  }

}
