import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddrequirementComponent } from './components/addrequirement/addrequirement.component';
import { JoblistComponent } from './components/joblist/joblist.component';
import { EditjobComponent } from './components/editjob/editjob.component';
import { CandidatelistComponent } from './components/candidatelist/candidatelist.component';
import { GetallCandidatesComponent } from './components/getall-candidates/getall-candidates.component';


const routes: Routes = [
  { path: 'add-requirement', component: AddrequirementComponent },
  { path: 'job-list', component: JoblistComponent },
  { path: 'edit-job', component: EditjobComponent },
  { path: 'candidate-list', component: CandidatelistComponent },
  { path: 'allcandidate', component: GetallCandidatesComponent },





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
