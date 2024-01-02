import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { RatingWizardComponent } from './rating/rating-wizard/rating-wizard.component';

export const routes: Routes = [
    { path: '', redirectTo: 'rating' , pathMatch: 'prefix'},
    { path: 'login', component: LoginComponent },
    { path: 'add-user', component: AddUserComponent },
    { path: 'rating', component: RatingWizardComponent }
];
