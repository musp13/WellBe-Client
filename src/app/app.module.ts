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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
const appRoutes: Routes = [
  {path:'admin',component: AdminLayoutComponent,
    children: [
      {path: 'login', component: AdminLoginComponent},
      {path: '', redirectTo: '/admin/login', pathMatch: 'full'}
    ]
  },
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, { enableTracing: true}),
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
