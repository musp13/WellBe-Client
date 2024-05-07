import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { adminLoggedOutGuard } from './routeGuards/adminLoggedOutGuard/admin-logged-out.guard';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { adminLoggedInGuard } from './routeGuards/adminLoggedInGuard/admin-logged-in.guard';
import { AdminAddTherapistComponent } from './components/admin/admin-add-therapist/admin-add-therapist.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { TherapistListComponent } from './components/admin/therapist-list/therapist-list.component';
import { TherapistLayoutComponent } from './layouts/therapist-layout/therapist-layout.component';
import { TherapistLoginComponent } from './components/therapist/therapist-login/therapist-login.component';
import { therapistLoggedOutGuard } from './routeGuards/therapistLoggedOutGuard/therapist-logged-out.guard';
import { therapistLoggedInGuard } from './routeGuards/therapistLoggedInGuard/therapist-logged-in.guard';
import { TherapistHomeComponent } from './components/therapist/therapist-home/therapist-home.component';
import { OtpVerificationComponent } from './components/shared/otp-verification/otp-verification.component';
import { ForgotPasswordComponent } from './components/shared/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/shared/reset-password/reset-password.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { userLoggedOutGuard } from './routeGuards/userLoggedOutGuard/user-logged-out.guard';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { AddJournalEntryComponent } from './components/user/add-journal-entry/add-journal-entry.component';
import { userLoggedInGuard } from './routeGuards/userLoggedInGuard/user-logged-in.guard';
import { ViewJournalsComponent } from './components/user/view-journals/view-journals.component';
import { ProfileComponent } from './components/therapist/profile/profile.component';
import { BookAppointmentComponent } from './components/user/book-appointment/book-appointment.component';
import { AppointmentsListComponent } from './components/shared/appointments-list/appointments-list.component';
import { TherapistAppointmentListComponent } from './components/therapist/therapist-appointment-list/therapist-appointment-list.component';
import { AppointmentDetailsComponent } from './components/shared/appointment-details/appointment-details.component';

const routes: Routes = [
  {path:'admin',component: AdminLayoutComponent,
    children: [
      {path: 'login', component: AdminLoginComponent, canActivate: [adminLoggedOutGuard]},
      {path: 'home', component: AdminHomeComponent, canActivate: [adminLoggedInGuard]},
      {path: 'add_therapist', component: AdminAddTherapistComponent, canActivate: [adminLoggedInGuard]},
      {path: 'user_list', component: UserListComponent, canActivate: [adminLoggedInGuard]},
      {path: 'therapist_list', component: TherapistListComponent, canActivate: [adminLoggedInGuard]},
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'},
    ]
  },
  {path:'therapist', component: TherapistLayoutComponent,
    children: [
      {path: 'login', component: TherapistLoginComponent, canActivate: [therapistLoggedOutGuard]},
      {path: 'home', component: TherapistHomeComponent, canActivate: [therapistLoggedInGuard]},
      {path: 'otp_verification', component: OtpVerificationComponent, canActivate: [therapistLoggedOutGuard]},
      {path: 'forgot_password', component: ForgotPasswordComponent, canActivate: [therapistLoggedOutGuard]},
      {path: 'reset_password/:token', component: ResetPasswordComponent, canActivate: [therapistLoggedOutGuard]},
      {path: 'profile', component: ProfileComponent,  canActivate: [therapistLoggedInGuard]},
      {path: 'appointment_list', component: TherapistAppointmentListComponent,  canActivate: [therapistLoggedInGuard]},
      {path: 'appointment_details/:appointmentId/:userType', component: AppointmentDetailsComponent, canActivate: [therapistLoggedInGuard]},
      {path: '', redirectTo: '/therapist/login', pathMatch: 'full'},
    ]
  },
  {path:'user', component: UserLayoutComponent,
    children: [
      {path: 'login', component: UserLoginComponent, canActivate: [userLoggedOutGuard]},
      {path: 'signup', component: UserSignupComponent, canActivate: [userLoggedOutGuard]},
      {path: 'home', component: UserHomeComponent}, /* , canActivate: [userLoggedInGuard] */
      {path: 'otp_verification', component: OtpVerificationComponent, canActivate: [userLoggedOutGuard]},
      {path: 'journal/:journalId', component: AddJournalEntryComponent, canActivate: [userLoggedInGuard]},
      {path: 'view_journals', component: ViewJournalsComponent, canActivate: [userLoggedInGuard]},
      {path: 'book_appointment', component: BookAppointmentComponent, canActivate: [userLoggedInGuard]},
      {path: 'appointment_list', component: AppointmentsListComponent, canActivate: [userLoggedInGuard]},
      {path: 'appointment_details/:appointmentId/:userType', component: AppointmentDetailsComponent, canActivate: [userLoggedInGuard]},
      {path: '', redirectTo: '/user/login', pathMatch: 'full'},
    ]
  },
  //{path: '', redirectTo: '/user/login', pathMatch: 'full'}
  {path: '', redirectTo: '/user/home', pathMatch: 'full' },
  {path: '*', redirectTo: '/user/home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
