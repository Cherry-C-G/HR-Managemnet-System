import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VisaStatusManagementComponent } from './visa-status-management/visa-status-management.component';
import { PersonInfoComponent } from './person-info/person-info.component';
import { NameSecComponent } from './person-info/name-sec/name-sec.component';
import { AddressSecComponent } from './person-info/address-sec/address-sec.component';
import { ContactSecComponent } from './person-info/contact-sec/contact-sec.component';
import { EmploymentSecComponent } from './person-info/employment-sec/employment-sec.component';
import { OnBoardingInsertFormComponent } from './on-boarding-insert-form/on-boarding-insert-form.component';
import { JwtInterceptor } from './jwt.interceptor';
import { LoginComponent } from './login/login.component';

import { HouseComponent } from './house/house.component';
import { CommentComponent } from './house/comment/comment.component';
import { DetailComponent } from './hrhouse-management/detail/detail.component';
import { CommentHRComponent } from './hrhouse-management/detail/comment-hr/comment-hr.component';


import { HireComponent } from './hire/hire.component';
import { AuthGuard, LoginGuard, RoleGuard } from './shared/auth.guard';
import { RegisterComponent } from './register/register.component';
import { EmergencySecComponent } from './person-info/emergency-sec/emergency-sec.component';
import { DocSecComponent } from './person-info/doc-sec/doc-sec.component';
import { ApprovedStatusGuard, NotSubmittedStatusGuard } from './shared/status.guard';
import { VisaStatusGuard } from './shared/visa-status.guard';
import { HREmployeeProfileComponent } from './hremployee-profile/hremployee-profile.component';
import { HRVisaStatusManagementComponent } from './hrvisa-status-management/hrvisa-status-management.component';
import { HRHouseManagementComponent } from './hrhouse-management/hrhouse-management.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

import { FileDownloadComponent } from './file-download/file-download.component';
import { DocumentPreviewComponent } from './document-preview/document-preview.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FileReviewComponent } from './file-review/file-review.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';
import { CommonModule } from '@angular/common';
import { DocumentTemplateComponent } from './document-template/document-template.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { ApplicationReviewComponent } from './hire/application-review/application-review.component';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PersonInfoComponent,
    NameSecComponent,
    AddressSecComponent,
    ContactSecComponent,
    EmploymentSecComponent,
    OnBoardingInsertFormComponent,
    LoginComponent,
    HouseComponent,
    CommentComponent,
    CommentHRComponent,
    DetailComponent,
    HREmployeeProfileComponent,
    HRHouseManagementComponent,
    HRVisaStatusManagementComponent,
    FileUploadComponent,
    FileDownloadComponent,
    DocumentPreviewComponent, 
    FileReviewComponent, 
    VisaStatusManagementComponent,
    DocumentTemplateComponent,
    DocumentationComponent,
    AvatarUploadComponent,  
    HireComponent,
    RegisterComponent,
    EmergencySecComponent,
    DocSecComponent,
    ApplicationReviewComponent,

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FontAwesomeModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate:[AuthGuard] },
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'login', component: LoginComponent, canActivate:[LoginGuard] },
      // { path: 'counter', component: CounterComponent },
      // { path: 'fetch-data', component: FetchDataComponent },
      {path: 'VisaStatus', component: VisaStatusManagementComponent, canActivate: [AuthGuard,ApprovedStatusGuard,VisaStatusGuard]},
      {path: 'PersonalInformation', component: PersonInfoComponent, canActivate: [AuthGuard]},
      { path: 'House', component: HouseComponent, canActivate: [AuthGuard, ApprovedStatusGuard] },
      { path: 'OnBoarding', component: OnBoardingInsertFormComponent , canActivate: [AuthGuard,NotSubmittedStatusGuard]},
      { path: 'Documentation', component: DocumentationComponent , canActivate: [AuthGuard,NotSubmittedStatusGuard]},
      { path: 'HR/Hire', component: HireComponent, canActivate: [AuthGuard,RoleGuard] },
      { path: 'HR/Hire/Review/:pid/:applicationid', component: ApplicationReviewComponent, canActivate: [AuthGuard,RoleGuard] },
      { path: 'HR/EmployeeProfile', component: HREmployeeProfileComponent, canActivate: [AuthGuard,RoleGuard] },
      { path: 'HR/VisaStatusManagement', component: HRVisaStatusManagementComponent, canActivate: [AuthGuard,RoleGuard] },
      { path: 'HR/HouseManagement', component: HRHouseManagementComponent, canActivate: [AuthGuard,RoleGuard] },
      { path: 'Register', component: RegisterComponent },
      { path: 'comment/:id', component: CommentComponent },
      { path: 'detail/:id', component: DetailComponent },
      { path: 'comment-hr/:id', component: CommentHRComponent } 

    ]),
    BrowserAnimationsModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
