import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { BsDatepickerConfig, DatepickerDateCustomClasses } from 'ngx-bootstrap/datepicker/public_api';
import { AddrequirementService } from 'src/app/service/addrequirement.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editjob',
  templateUrl: './editjob.component.html',
  styleUrls: ['./editjob.component.css']
})
export class EditjobComponent implements OnInit {

  showBtn:boolean= false;
  formData;
  slectedDiv;
  isButtonVisible:boolean=true;
  datePickerConfig: Partial<BsDatepickerConfig>;
  myForm:FormGroup;
  minDate: Date;
  maxDate: Date;
  myRequirement=[];
  error:any = {
    isError:false,
    errorMessage:''
  };
  ani:boolean=true;
  formMessage:any;
  dateCustomClasses: DatepickerDateCustomClasses[];

  constructor( private fb:FormBuilder ,
               private requirementservice:AddrequirementService ,
               private toastr: ToastrService,
               private spinner: NgxSpinnerService,
               private router:Router) {

    this.minDate = new Date();
    this.maxDate = new Date();
    this.maxDate.setMonth(this.maxDate.getMonth() + 10);

    const now = new Date();
    const todaydate = new Date();
    todaydate.setDate(now.getDate());
    this.dateCustomClasses = [
      { date: now, classes: [] },
      { date: todaydate, classes: ['bg-warning'] }
    ];

   this.datePickerConfig = Object.assign({},{ containerClass: 'theme-dark-blue'});
    
   }

  ngOnInit(): void { 
    this.myForm = this.fb.group({
      clientName:this.fb.control(null,[Validators.required]),
      clientshortName:this.fb.control(null,[Validators.required]),
      title:this.fb.control(null,[Validators.required]),
      qualification:this.fb.control(null,[Validators.required]),
      positions:this.fb.control(null,[Validators.required]),
      location:this.fb.control(null,[Validators.required]),
      description:this.fb.control(null,[Validators.required,Validators.maxLength(255)]),
      startDate:this.fb.control(null,[Validators.required]),
      endDate:this.fb.control(null,[Validators.required]),
      salaryFrom:this.fb.control(null,[Validators.required]),
      salaryTo:this.fb.control(null,[Validators.required]),
      yearOfExp:this.fb.control(null,[Validators.required]),
      status:this.fb.control(null,[Validators.required]),

      skills:this.fb.array([
        this.returnskills()
      ])
    });
    
    this.formData = JSON.parse(localStorage.getItem('editJob'));
    console.log(this.formData)
    this.myForm = this.fb.group({
      reqId :this.fb.control(this.formData.reqId),
      clientName:this.fb.control(this.formData.clientName),
      clientshortName:this.fb.control(this.formData.clientshortName),
      title:this.fb.control(this.formData.title),
      qualification:this.fb.control(this.formData.qualification),
      positions:this.fb.control(this.formData.positions),
      location:this.fb.control(this.formData.location),
      description:this.fb.control(this.formData.description),
      startDate:this.fb.control(this.formData.startDate),
      endDate:this.fb.control(this.formData.endDate),
      salaryFrom:this.fb.control(this.formData.salaryFrom),
      salaryTo:this.fb.control(this.formData.salaryTo),
      yearOfExp:this.fb.control(this.formData.yearOfExp),
      status:this.fb.control(this.formData.status,[Validators.required]),

      skills:this.fb.array(
        this.formData.skills.map(skill => this.editSkill(skill))
      )
    });
  }


  //All getters
  get reqId() {
    return this.myForm.get('reqId') as FormControl;
  }
  get clientName() {
    return this.myForm.get('clientName') as FormControl;
  }
  get clientshortName() {
    return this.myForm.get('clientshortName') as FormControl;
  }
  get title() {
    return this.myForm.get('title') as FormControl;
  }
  get qualification() {
    return this.myForm.get('qualification') as FormControl;
  }
  get positions() {
    return this.myForm.get('positions') as FormControl;
  }
  get location() {
    return this.myForm.get('location') as FormControl;
  }
  get description() {
    return this.myForm.get('description') as FormControl;
  }
  get startDate() {
    return this.myForm.get('startDate') as FormControl;
  }
  get endDate() {
    return this.myForm.get('endDate') as FormControl;
  }
  get salaryFrom() {
    return this.myForm.get('salaryFrom') as FormControl;
  }
  get salaryTo() {
    return this.myForm.get('salaryTo') as FormControl;
  }
  get yearOfExp() {
    return this.myForm.get('yearOfExp') as FormControl;
  }
  get status() {
    return this.myForm.get('status') as FormControl;
  }
  get skills():FormArray {
    return this.myForm.get('skills') as FormArray;
   }
  returnskills() {
    return this.fb.control(null,[Validators.required])
  }
  editSkill(skill) {
    return this.fb.control(skill)
  }
  addSkills(e,i) {
    console.log(e.target.hidden);
    console.log(i)
    e.target.hidden=true;
    (this.myForm.get('skills') as FormArray).push(this.returnskills());
  }
  removeSkills(i) :void {
    console.log(i);
    if(i==0){
      this.showBtn =true;
    }
    (this.myForm.get('skills') as FormArray).removeAt(i);
  }
  compareTwoDates(e) { 
    if ((new Date(this.myForm.controls['startDate'].value)>=new Date(this.myForm.controls['endDate'].value))) {
       this.error= {isError:true,errorMessage:'End Date Should be grater than start date'};
    }
    else {
      this.error = false;      
         }
     }
   //  For toaster
    showSuccess() {
      this.toastr.success(this.formMessage, 'Welcome!');
    }
    showError() {
      this.toastr.error(this.formMessage, '!opps');
    }

     myFunction(divId) {
       console.log(divId)
       this.slectedDiv=divId;
       var element = document.getElementById(this.slectedDiv);
       element.classList.toggle("minicard");
   } 
   addSkills1() {
    (this.myForm.get('skills') as FormArray).push(this.returnskills());

   }
   showSpinner(name: string) {
    this.spinner.show(name);
    setTimeout(() => {
          this.spinner.hide(name);
        }, 900);
     }

  onsubmit() {
    console.log(this.myForm.value);
    // localStorage.setItem('jobrequirement',JSON.stringify(this.myForm.value));
    this.requirementservice.editRequirement(this.myForm.value).subscribe((data)=>{
      console.log(data);
      this.myForm.reset();
      this.router.navigateByUrl('job-list');

    })
     
  }

}
