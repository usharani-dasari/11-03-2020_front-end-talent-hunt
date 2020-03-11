import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddrequirementService } from 'src/app/service/addrequirement.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-joblist',
  templateUrl: './joblist.component.html',
  styleUrls: ['./joblist.component.css']
})
export class JoblistComponent implements OnInit {
  requirement:any;
  jobRequirements=[];
  newArray;
  joblist;
  formMessage = '';

  constructor(private router:Router, private addrequrementservice:AddrequirementService,  private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getRequirement();
  }
  showSuccess() {
    this.toastr.success(this.formMessage, '');
  }
  showError() {
    this.toastr.error(this.formMessage, '!Not addedd');
  }
  getRequirement() {
    this.addrequrementservice.getRequirementData().subscribe((data : any)=> {
      this.jobRequirements = data.data;
      console.log(this.jobRequirements);
  })
  }
  editJob(job){
    console.log(job);
    localStorage.setItem('editJob',JSON.stringify(job));
    this.router.navigateByUrl('edit-job')
  }
  deleteJoblist(job){
    console.log(job)
    this.joblist = job.reqId;

  }
  deleteRequirement() {
    console.log("sjhshsh");
    this.addrequrementservice.deleteRequirement(this.joblist).subscribe((data)=>{
    console.log(data);
    this.getRequirement();
    })
  }
  gotoJoblist(job) {
    console.log(job);
    localStorage.setItem('jobList',JSON.stringify(job));
   this.router.navigateByUrl('/candidate-list')
  }
}
