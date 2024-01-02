import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Rating } from '../../shared/models/rating';
import { RatingService } from '../../shared/services/rating.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { CustomValidateTZ } from '../../shared/validators/IDNumber.validator';
import { CommaNumberDirective } from '../../shared/directives/comma-number.directive';
// import { CommaNumberDirective } from '../../shared/directives/comma-number.directive';

export function validateId(control: AbstractControl) {
  const id = control.value;
  if (!id) return;
  let idArray = id.split('').map((x: string) => parseInt(x));

  // Calculate check digit
  let checkDigit = idArray[0] + idArray[2] + idArray[4] + idArray[6];
  checkDigit *= 2;
  checkDigit += idArray[1] + idArray[3] + idArray[5] + idArray[7];
  checkDigit = checkDigit % 10;

  // Verify check digit
  if (checkDigit !== idArray[8]) return { 'TZ': true };

  return null;
}
@UntilDestroy()
@Component({
  selector: 'app-rating-wizard',
  standalone: true,
  imports: [MatStepperModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    MatSliderModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    CommaNumberDirective],
  templateUrl: './rating-wizard.component.html',
  styleUrl: './rating-wizard.component.scss',
})
export class RatingWizardComponent {

  public incomeSources: Array<any> = [
    { key: 'employee', value: 'שכיר' },
    { key: 'Independent', value: 'עצמאי' },
    { key: 'allowance', value: 'קיצבה' },
  ];

  public economicHistory: Array<any> = [
    { key: 'noProblem', value: 'ללא רבב' },
    { key: 'mediumProblem', value: 'חזרות בודדות' },
    { key: 'bigProblem', value: 'הרבה חזרות' },
  ];

  form = new FormGroup({
    personalDetails: new FormGroup({
      name: new FormControl('', Validators.required),
      age: new FormControl('', [
        Validators.required,
        Validators.min(18),
        Validators.max(80),
      ]),
      idNumber: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\s*\d{9}\s*$/),
        CustomValidateTZ()
      ])
    }),
    property: new FormGroup({
      requestedLoanAmount: new FormControl('', [
        Validators.required,
        Validators.min(100000)
      ]),
      propertyValue: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.min(300000)
      ]),
      equity: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d+$/)
      ])
    }),
    incomes: new FormArray([new FormGroup({
      sum: new FormControl(''),
      source: new FormControl(''),
      seniority: new FormControl('')
    })]),
    payingOut: new FormGroup({
      monthlyRefund: new FormControl('', Validators.required),
      sumDebts: new FormControl('', Validators.required),
    }),

    history: new FormGroup({
      economicHistory: new FormControl('', Validators.required),

    }),
  });

  constructor(private fb: FormBuilder,
    private ratingService: RatingService) {
  }




  public addIncome() {
    const newIncome = this.fb.group({
      sum: ['', Validators.required],
      source: ['', Validators.required],
      seniority: ['', Validators.required]
    });

    this.form.controls.incomes.push(newIncome);

  }

  public deleteIncome(index: number) {
    this.form.controls.incomes.removeAt(index);
  }

  public submit() {
    const rating = this.form.value as unknown as Rating;
    this.ratingService.calcRating(rating).pipe(untilDestroyed(this)).subscribe(res => {
      console.log(res);
    })

  }



}
