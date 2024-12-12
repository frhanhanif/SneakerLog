import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSneakerComponent } from './delete-sneaker.component';

describe('DeleteSneakerComponent', () => {
  let component: DeleteSneakerComponent;
  let fixture: ComponentFixture<DeleteSneakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteSneakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteSneakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
