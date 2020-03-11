import { Component, OnInit, ɵConsole } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AddrequirementService } from 'src/app/service/addrequirement.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-candidatelist',
  templateUrl: './candidatelist.component.html',
  styleUrls: ['./candidatelist.component.css']
})
export class CandidatelistComponent implements OnInit {

  slectedDiv;
  candidateForm: FormGroup;
  candidateMailForm: FormGroup;
  scheduleInterviewForm: FormGroup;
  candidateList = [];
  formMessage = '';
  messeage;
  showMessage: boolean = false;
  candidateInfo;
  candidateId;
  singleJobrequirement=[];
  username:string='Anil';
  reqId;
  searchByName:string;
  searchByNumber:string;
  mailDetails;
  headers;
  to=[];
  from=[];


  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private requirementservice: AddrequirementService,
    private toastr: ToastrService, private addrequrementservice:AddrequirementService) { }

  ngOnInit(): void {
    this.getCandidatelist();
    this.candidateForm = this.fb.group({
      recruiterName: this.fb.control(null),
      status: this.fb.control(null),
      client: this.fb.control(this.username),
      candidateId: this.fb.control(null),
      candidateName: this.fb.control(null),
      mailId: this.fb.control(null),
      totalExp: this.fb.control(null),
      relExperience: this.fb.control(null),
      ctc: this.fb.control(null),
      ectc: this.fb.control(null),
      contactNumber: this.fb.control(null),
      currOraganization: this.fb.control(null),
      noticePeriod: this.fb.control(null),
      currentLoc: this.fb.control(null),
      skills: this.fb.array([
        this.returnSkill()
      ])
    })
    this.scheduleInterviewForm = this.fb.group({
      date:this.fb.control(null),
      time:this.fb.control(null),
      pointOfContact:this.fb.control(null),
      contactPerson:this.fb.control(null),
      status:this.fb.control(null)
    })
    console.log(JSON.parse(localStorage.getItem('singlecandidate')));
    this.mailDetails = JSON.parse(localStorage.getItem('singlecandidate'));
    console.log(this.mailDetails)

    this.candidateMailForm = this.fb.group({
      from:this.fb.control(null),
      to:this.fb.control(null),
      subject:this.fb.control(null),
      content:this.fb.control(null),
    })
    this.singleJobrequirement.push(JSON.parse(localStorage.getItem('jobList')));
    console.log(this.singleJobrequirement);
    this.getCandidatelist();
  }
  getCandidatelist() {
    const result=JSON.parse(localStorage.getItem('jobList'));
    console.log(this.reqId=result.reqId)
    this.requirementservice.getCandidateUnderReq(this.reqId).subscribe((res:any)=> {
      console.log(res);
      this.candidateList = res.data;
    })
  }
    
  get skills(): FormArray {
    return this.candidateForm.get('skills') as FormArray;
  }

  addSkills() {
    (this.candidateForm.get('skills') as FormArray).push(this.returnSkill())
  }
  
  removeskill(i) {
    (this.candidateForm.get('skills') as FormArray).removeAt(i)
  }
  returnSkill() {
    return this.fb.control(null)
  }

  myFunction(divId) {
    console.log(divId)
    this.slectedDiv = divId;
    var element = document.getElementById(this.slectedDiv);
    element.classList.toggle("minicard");
  }
  showSuccess() {
    this.toastr.success(this.formMessage, '');
  }
  showError() {
    this.toastr.error(this.formMessage, '!Not addedd');
  }
  saveCandidate(candidate) {
    console.log(candidate);
    this.candidateId =candidate.candidateId;
  }
  editskill(skill) {
    return this.fb.control(skill)
  }
  deleteCandidate() {
    console.log(this.candidateId);
    this.requirementservice.deleteCandidate(this.candidateId).subscribe((res:any)=> {
      console.log(res);
      this.getCandidatelist();
      if(res.error==false) {
        this.formMessage = 'candidate deleted successfully'
        this.showSuccess();
      }
      if(res.error==true) {
        this.formMessage = 'candidate not deleted'
        this.showError();
      }
    })
  }

// Edit candidate
  editCandidate(candidate) {
    console.log(candidate);
    this.candidateInfo = candidate;
    console.log(this.candidateInfo);
    this.candidateForm.reset();
    this.candidateForm = this.fb.group({
      recruiterName: this.fb.control(JSON.parse(localStorage.getItem('user'))),
      candidateId: this.fb.control(this.candidateInfo.candidateId),
      status: this.fb.control(null),
      candidateName: this.fb.control(this.candidateInfo.candidateName),
      mailId: this.fb.control(this.candidateInfo.mailId),
      totalExp: this.fb.control(this.candidateInfo.totalExperience),
      relExperience: this.fb.control(this.candidateInfo.relExperience),
      ctc: this.fb.control(this.candidateInfo.ctc),
      ectc: this.fb.control(this.candidateInfo.ectc),
      contactNumber: this.fb.control(this.candidateInfo.contactNumber),
      currOraganization: this.fb.control(this.candidateInfo.currOraganization),
      noticePeriod: this.fb.control(this.candidateInfo.noticePeriod),
      currentLoc: this.fb.control(this.candidateInfo.currentLoc),
      skills: this.fb.array(
        this.candidateInfo.skills.map(skill => this.editskill(skill))
      )
    })
  }

  updateCandidate(candidateForm) {
    console.log(candidateForm.value)
    localStorage.removeItem('singlecandidate');
    localStorage.setItem('singlecandidate',JSON.stringify(candidateForm.value));
    this.getCandidatelist();
    console.log(candidateForm.value);
    this.requirementservice.editCandidate(candidateForm.value).subscribe((res:any)=>{
      console.log(res);
      this.getCandidatelist();
      this.candidateForm.reset();
      if(res.error== false) {
        this.formMessage = 'Candidate Updated Successfully';
        this.showSuccess();
      }
    })
  }
  addCandidate() {
    console.log(this.candidateForm.value);
    localStorage.setItem('getcandidate',JSON.stringify(this.candidateForm.value));
    this.requirementservice.postCandidate(this.candidateForm.value).subscribe((data: any) => {
      console.log(data);
      this.candidateForm.reset();
      this.getCandidatelist();
      if (data.error === false) {
        this.formMessage = 'Candidate Added Successfully';
        this.showSuccess();
      }
      if (data.error === true) {
        this.formMessage = data.description;
        this.showError();
      }
    },
      (err) => {
        console.log(err);
        this.showError();
      })
  }

  clearForm() {
    this.candidateForm.reset();
    this.candidateForm = this.fb.group({
      recruiterName: this.fb.control(this.username),
      client: this.fb.control(this.reqId),
      status: this.fb.control('Active'),
      candidateId: this.fb.control(null),
      candidateName: this.fb.control(null),
      mailId: this.fb.control(null),
      totalExp: this.fb.control(null),
      relExperience: this.fb.control(null),
      ctc: this.fb.control(null),
      ectc: this.fb.control(null),
      contactNumber: this.fb.control(null),
      currOraganization: this.fb.control(null),
      noticePeriod: this.fb.control(null),
      currentLoc: this.fb.control(null),
      skills: this.fb.array([
        this.returnSkill()
      ])
    })
  }
  saveSingleCandidate(candidate) {
    console.log(candidate);
    localStorage.setItem('singlecandidate',JSON.stringify(candidate));
  }
  interviewSchedule() {
    console.log(this.scheduleInterviewForm.value);
  }
  sendMail() {
    console.log(this.candidateMailForm.value);
    this.to.push(this.candidateMailForm.value.to);
    console.log(JSON.stringify(this.to));
     this.headers = {
      'Content-Type': 'application/json',
      'from': this.candidateMailForm.value.from,
      'tos':JSON.stringify(["hghjj"]),
      'ccs': JSON.stringify(["hghjj"]),
      'content': this.candidateMailForm.value.content,
      'subject': this.candidateMailForm.value.subject,
     }
     console.log(this.headers);
     this.requirementservice.postEmail(this.headers).subscribe((res)=> {
       console.log(res)
     })
  }

}
