import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  myForm: FormGroup;
  bu:string;
  ku:string='';
  asbu:string;
  access:string;
  kin:string = ' ';
  data;
  one:boolean=false;
  two:boolean=false;
  three:boolean=false;
  four:boolean=false;
  five:boolean=false;
  constructor(private router: Router,private auth:AuthService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.access = 'UserAdmin';
    this.createform();
  }
  createform()
{
	this.myForm = this.formBuilder.group({
    firstname: ['', [Validators.required] ],
    lastname: ['', [Validators.required] ],
    id: ['', [Validators.required] ],
    email: ['', [Validators.required,Validators.email] ],
    opti123: ['', [Validators.required] ],
    dbu: ['', [Validators.required] ],
    abu: ['', [Validators.required] ]
    });
    this.myForm.patchValue({
      opti123:'Maker'
      });
}

addit()
{
  this.auth.
  putuser(this.myForm.value.firstname + this.myForm.value.lastname,this.myForm.value.id
    ,this.myForm.value.email,this.myForm.value.opti123,this.access,this.myForm.value.firstname)
	.subscribe(data123 => {
  this.data = data123;
  localStorage.setItem(this.data[0].b_user_fn,this.myForm.value.lastname);
  localStorage.setItem('dbu'+ this.data[0].b_user_fn,this.myForm.value.dbu);
  localStorage.setItem('abu'+ this.data[0].b_user_fn,this.myForm.value.abu);
    if(this.data)
    this.router.navigate(['']);
    });
  }

modify1(str:string)
{
this.access = str;

}

modify(str:string)
{
this.bu = str;
this.kin = this.kin + str +'\n';
this.asbu = this.kin;

}
adding1()
{
  this.myForm.patchValue({
    dbu:this.bu
    });
    this.ku=this.bu;
    this.asbu = ' ';
    this.kin = ' ';
if(this.bu=='PSCL')
{
this.one = true;
this.two = false;
this.three = false;
this.four = false;
this.five = false;
}
else if(this.bu=='26BU')
{
  this.one = false;
  this.two =  true;
  this.three = false;
  this.four = false;
  this.five = false;
  }
else if(this.bu=='30BU')
{
  this.one = false;
  this.two = false;
  this.three =  true;
  this.four = false;
  this.five = false;
  }
else if(this.bu=='GUNTUR123')
{
  this.one = false;
  this.two = false;
  this.three = false;
  this.four =  true;
  this.five = false;
  }
else
{
  this.one = false;
  this.two = false;
  this.three = false;
  this.four = false;
  this.five =  true;
  }
}
remove1()
{
  this.myForm.patchValue({
    dbu:''
    });
    this.asbu = ' ';
    this.kin = ' ';
    if(this.ku=='PSCL')
    this.one = false;
    else if(this.ku=='26BU')
    this.two = false;
    else if(this.ku=='30BU')
    this.three = false;
    else if(this.ku=='GUNTUR123')
    this.four = false;
    else
    this.five = false;
}
adding2()
{
  this.myForm.patchValue({
    abu:this.asbu
    });
}
remove2()
{
  this.myForm.patchValue({
    abu:''
    });
    this.asbu = ' ';
    this.kin = ' ';

}

goback()
{
  this.router.navigate(['']);
}

}
