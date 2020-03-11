import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddrequirementService } from 'src/app/service/addrequirement.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-getall-candidates',
  templateUrl: './getall-candidates.component.html',
  styleUrls: ['./getall-candidates.component.css']
})
export class GetallCandidatesComponent implements OnInit {

  slectedDiv;
  candidateForm: FormGroup;
  editCandidateInfo: FormGroup;
  candidateList = [];
  formMessage = '';
  messeage;
  showMessage: boolean = false;
  candidateInfo;
  candidateId;
  singleJobrequirement=[];
  username;
  searchByName:string;
  searchByNumber:string;


  constructor(private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private requirementservice: AddrequirementService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    localStorage.setItem('user',JSON.stringify('TY_angular_2_92'))
    this.username=(JSON.parse(localStorage.getItem('user')))
    console.log(this.username)
    this.getCandidatelist();
    this.candidateForm = this.fb.group({
      recruiterName: this.fb.control({value:this.username,disabled:true}),
      candidateId: this.fb.control(null),
      candidateName: this.fb.control(null),
      joiningDate: this.fb.control(null),
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
    
    this.singleJobrequirement.push(JSON.parse(localStorage.getItem('jobList')));
    console.log(this.singleJobrequirement.length);
    
  }
  getCandidatelist() {
    this.requirementservice.getCandidate().subscribe((res) => {
      this.candidateList = res.data;
    });
 
    
      console.log(this.candidateList)
   
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
 
  addCandidate() {
    console.log(this.candidateForm.value);
    localStorage.setItem('getcandidate',JSON.stringify(this.candidateForm.value));
    this.requirementservice.postCandidate(this.candidateForm.value).subscribe((data: any) => {
      console.log(data);
      this.getCandidatelist()
      this.candidateForm.reset();
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


  editCandidate(candidate) {
    this.candidateInfo = candidate;
    console.log(this.candidateInfo);
    this.candidateForm = this.fb.group({
      recruiterName: this.fb.control(JSON.parse(localStorage.getItem('user'))),
      candidateId: this.fb.control(this.candidateInfo.candidateId),
      candidateName: this.fb.control(this.candidateInfo.candidateName),
      joiningDate: this.fb.control(this.candidateInfo.joiningDate),
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

  get contactNumber() {
    return this.candidateForm.get('contactNumber') as FormControl;
  }

  updateCandidate(candidateForm) {
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

  deleteCandidate() {
    console.log(this.candidateId);
    this.requirementservice.deleteCandidate(this.candidateId).subscribe((res:any)=> {
      console.log(res);
      this.getCandidatelist();
      if(res.error == false) {
        this.formMessage = 'candidate deleted successfully'
        this.showSuccess();
      }
      if(res.error == true) {
        this.formMessage = res.data;
        this.showError();
      }
    })
  }

  clearForm() {
    this.candidateForm.reset();
    this.candidateForm = this.fb.group({
      recruiterName: this.fb.control({value:this.username,disabled:true}),
      candidateId: this.fb.control(null),
      candidateName: this.fb.control(null),
      joiningDate: this.fb.control(null),
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

  sendCandidatewithThisNumber(contactNumber){
    console.log(contactNumber);
  }

}
