import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import {CardModule} from 'primeng/card';  
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [ReactiveFormsModule,   CardModule, InputTextModule],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {

  userForm: FormGroup;

  constructor(private authService: AuthService) {
    this.userForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('') 
    });
  }

  submitForm() {
    this.authService.addUser(this.userForm.controls['username']?.value,
     this.userForm.controls['password']?.value,
      this.userForm.controls['firstName']?.value,
       this.userForm.controls['lastName']?.value,).subscribe((res: any) => {

    })
  }

}