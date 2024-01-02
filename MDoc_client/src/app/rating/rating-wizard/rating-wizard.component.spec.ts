import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingWizardComponent } from './rating-wizard.component';

describe('RatingWizardComponent', () => {
  let component: RatingWizardComponent;
  let fixture: ComponentFixture<RatingWizardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RatingWizardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RatingWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
