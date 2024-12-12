import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveSneakerComponent } from './save-sneaker.component';

describe('SaveSneakerComponent', () => {
  let component: SaveSneakerComponent;
  let fixture: ComponentFixture<SaveSneakerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaveSneakerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaveSneakerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
