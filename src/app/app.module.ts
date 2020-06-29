import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { environment } from '../environments/environment';
import { AppNavbarComponent } from './pages/app-navbar/app-navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageComponent } from './pages/upload-image/upload-image.component';
import { StephenluinUploadComponent } from './pages/stephenluin-upload/stephenluin-upload.component';
import { PhoneLoginComponent } from './pages/phone-login/phone-login.component';
import { MainContentComponent } from './main-content/main-content.component';


const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'uploadimage', component: UploadImageComponent },
  { path: 'phonelogin', component: PhoneLoginComponent },
  { path: 'maincontent', component: MainContentComponent },
  { path: '**', component: HomeComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    AppNavbarComponent,
    UploadImageComponent,
    StephenluinUploadComponent,
    PhoneLoginComponent,
    MainContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
