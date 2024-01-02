import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserModule, Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { HttpClient, HttpHandler } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    ButtonModule,
    PasswordModule,
    CommonModule,
    ReactiveFormsModule],
    providers: [
      AuthService,
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
    private router: Router,
    private titleService: Title) {

    this.loginForm = this.formBuilder.group({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required])
    });

  }

  onSubmit() {
    if (!this.loginForm.valid) {
      this.loginForm.controls['userName'].markAsTouched();
      this.loginForm.controls['userName'].markAsDirty();
      return;
    }

    let formValues = this.loginForm.getRawValue();

    var request = {
      userName: formValues.userName,
      password: formValues.password,
    };

    this.authService.login(request.userName, request.password).subscribe((res: any) => {
      if (res?.token) {
        this.authService.setToken(res.token);
      }
    });


  }

}
