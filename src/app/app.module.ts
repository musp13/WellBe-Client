import { NgModule } from '@angular/core';
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
import { CommonModule } from '@angular/common';
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

const appRoutes: Routes = [
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
      {path: '', redirectTo: '/therapist/login', pathMatch: 'full'},
    ]
  },
  {path:'user', component: UserLayoutComponent,
    children: [
      {path: 'login', component: UserLoginComponent, canActivate: [userLoggedOutGuard]},
      {path: 'signup', component: UserSignupComponent, canActivate: [userLoggedOutGuard]},
      {path: 'home', component: UserHomeComponent}, /* , canActivate: [userLoggedInGuard] */
      {path: 'otp_verification', component: OtpVerificationComponent, canActivate: [userLoggedOutGuard]},
      {path: '', redirectTo: '/user/login', pathMatch: 'full'},
    ]
  },
  //{path: '', redirectTo: '/user/login', pathMatch: 'full'}
  {path: '', redirectTo: '/user/home', pathMatch: 'full' },
  {path: '*', redirectTo: '/user/home', pathMatch: 'full'}
]

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true}),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StoreModule.forRoot({},{}),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxAwesomePopupModule.forRoot(),// Essential, mandatory main module.
    DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
    ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
    ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([paramsInterceptor,credentialsInterceptor,loggingInterceptor])),
    provideStore(),
    provideState({name:'adminLogin', reducer: adminLoginReducer}),
    provideState({name:'therapistLogin', reducer: therapistLoginReducer}),
    provideState({name:'userLogin', reducer: userLoginReducer}),
    provideEffects([AdminLoginEffects, TherapistLoginEffects, UserLoginEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
