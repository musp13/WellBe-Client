import { Component, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, RouterOutlet, Routes } from '@angular/router';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { UserLayoutComponent } from './layouts/user-layout/user-layout.component';
import { TherapistLayoutComponent } from './layouts/therapist-layout/therapist-layout.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { LogoComponent } from './components/shared/logo/logo.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { StoreModule, provideState, provideStore } from '@ngrx/store';
import { adminLoginReducer } from './states/adminAuth/adminAuth.reducer';
import { AdminLoginEffects } from './states/adminAuth/adminAuth.effects';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { adminLoggedInGuard } from './routeGuards/adminLoggedInGuard/admin-logged-in.guard';
import { adminLoggedOutGuard } from './routeGuards/adminLoggedOutGuard/admin-logged-out.guard';
import { TherapistHeaderComponent } from './components/therapist/therapist-header/therapist-header.component';
import { TherapistHomeComponent } from './components/therapist/therapist-home/therapist-home.component';
import { TherapistLoginComponent } from './components/therapist/therapist-login/therapist-login.component';
import { therapistLoginReducer } from './states/therapistAuth/therapistAuth.reducer';
import { TherapistLoginEffects } from './states/therapistAuth/therapistAuth.effects';
import { therapistLoggedOutGuard } from './routeGuards/therapistLoggedOutGuard/therapist-logged-out.guard';
import { therapistLoggedInGuard } from './routeGuards/therapistLoggedInGuard/therapist-logged-in.guard';
import { UserHeaderComponent } from './components/user/user-header/user-header.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { userLoginReducer } from './states/userAuth/userAuth.reducer';
import { UserLoginEffects } from './states/userAuth/userAuth.effects';
import { userLoggedOutGuard } from './routeGuards/userLoggedOutGuard/user-logged-out.guard';
import { userLoggedInGuard } from './routeGuards/userLoggedInGuard/user-logged-in.guard';
import { UserSignupComponent } from './components/user/user-signup/user-signup.component';
import { AdminAddTherapistComponent } from './components/admin/admin-add-therapist/admin-add-therapist.component';
import { loggingInterceptor } from './interceptors/logging/logging.interceptor';
import { credentialsInterceptor } from './interceptors/credentials/credentials.interceptor';
import { paramsInterceptor } from './interceptors/params/params.interceptor';
import { OtpVerificationComponent } from './components/shared/otp-verification/otp-verification.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './components/shared/home-page/home-page.component';
import { ConfirmBoxConfigModule, DialogConfigModule, NgxAwesomePopupModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';
import { UserTableComponent } from './components/shared/user-table/user-table.component';
import { TherapistListComponent } from './components/admin/therapist-list/therapist-list.component';
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { MatConfirmDialogComponent } from './components/shared/mat-confirm-dialog/mat-confirm-dialog.component';
import { ChangePasswordComponent } from './components/shared/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/shared/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/shared/reset-password/reset-password.component';
import { AddJournalEntryComponent } from './components/user/add-journal-entry/add-journal-entry.component';
import { ViewJournalsComponent } from './components/user/view-journals/view-journals.component';
import { ProfileComponent } from './components/therapist/profile/profile.component';
import { Button1Component } from './components/shared/buttons/button1/button1.component';
import { BookAppointmentComponent } from './components/user/book-appointment/book-appointment.component';
import { AvailabilityFormComponent } from './components/therapist/availability-form/availability-form.component';
import { MarkLeaveComponent } from './components/therapist/mark-leave/mark-leave.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerInput, MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppointmentsListComponent } from './components/shared/appointments-list/appointments-list.component';
import { TherapistAppointmentListComponent } from './components/therapist/therapist-appointment-list/therapist-appointment-list.component';
import { AppointmentDetailsComponent } from './components/shared/appointment-details/appointment-details.component';
import { authenticationErrorHandlingInterceptor } from './interceptors/authenticationErrorHandling/authentication-error-handling.interceptor';
/* import { Button1Component } from './components/shared/button1/button1.component'; */


@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    TherapistLayoutComponent,
    AdminHeaderComponent,
    AdminLoginComponent,
    FooterComponent,
    LogoComponent,
    AdminHomeComponent,
    TherapistHeaderComponent,
    TherapistHomeComponent,
    TherapistLoginComponent,
    UserHeaderComponent,
    UserHomeComponent,
    UserLoginComponent,
    UserSignupComponent,
    AdminAddTherapistComponent,
    OtpVerificationComponent,
    HomePageComponent,
    UserTableComponent,
    TherapistListComponent,
    UserListComponent,
    MatConfirmDialogComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AddJournalEntryComponent,
    ViewJournalsComponent,
    ProfileComponent,
    Button1Component,
    BookAppointmentComponent,
    AvailabilityFormComponent,
    MarkLeaveComponent,
    AppointmentsListComponent,
    TherapistAppointmentListComponent,
    AppointmentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //RouterModule.forRoot(routes, { enableTracing: true}),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forRoot({},{}),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxAwesomePopupModule.forRoot(),// Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot(), // Needed for instantiating toast notifications.
    DatePipe,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatDatepickerInput,
    MatInputModule,
    MatNativeDateModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([paramsInterceptor,credentialsInterceptor,loggingInterceptor, authenticationErrorHandlingInterceptor])),
    provideStore(),
    provideState({name:'adminLogin', reducer: adminLoginReducer}),
    provideState({name:'therapistLogin', reducer: therapistLoginReducer}),
    provideState({name:'userLogin', reducer: userLoginReducer}),
    provideEffects([AdminLoginEffects, TherapistLoginEffects, UserLoginEffects]),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
