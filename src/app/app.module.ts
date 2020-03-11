import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AddrequirementComponent } from './components/addrequirement/addrequirement.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToasterComponent } from './components/toaster/toaster.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerModule } from "ngx-spinner";
import { JoblistComponent } from './components/joblist/joblist.component';
import { EditjobComponent } from './components/editjob/editjob.component';
import { CandidatelistComponent } from './components/candidatelist/candidatelist.component';
import { candidateFilterPipe2 } from './components/candidatelist/candidate-filterbynumber.pipe ';
import { GetallCandidatesComponent } from './components/getall-candidates/getall-candidates.component';
import { CandidatefilterBynamePipe } from './pipes/candidatefilter-byname.pipe';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AddrequirementComponent,
    ToasterComponent,
    JoblistComponent,
    EditjobComponent,
    CandidatelistComponent,
    candidateFilterPipe2,
    GetallCandidatesComponent,
    CandidatefilterBynamePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxSpinnerModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    // AlertModule.forRoot({maxMessages: 5, timeout: 5000, position: 'right'}),
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass:'toast-center-center',
      preventDuplicates: true
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
