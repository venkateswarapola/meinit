import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-modify',
  templateUrl: './modify.component.html',
  styleUrls: ['./modify.component.css']
})
export class ModifyComponent implements OnInit {
  myForm: FormGroup;
  data;
  access:string;
  bu:string;
  asbu:string;
  kin:string = ' ';
  numid:number;
  constructor(private router: Router,private auth:AuthService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.data = this.auth.getinfo();
    this.numid = this.data[0].b_user_id;
    console.log(this.data);
    this.createform();
    this.access = this.data[0].b_user_title;
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
      abu: new FormControl({value: localStorage.getItem('abu' + this.data[0].b_user_fn), disabled: true}, Validators.required)
      });
      this.myForm.patchValue({
        firstname:this.data[0].b_user_fn,
        lastname:localStorage.getItem(this.data[0].b_user_fn),
        id:this.data[0].b_user_id,
        email:this.data[0].b_user_mail,
        opti123:this.data[0].b_user_role,
        dbu:localStorage.getItem('dbu' + this.data[0].b_user_fn)
        });
  }

  modify(str:string)
  {
  this.bu = str;
  }

  adding1()
  {
    this.myForm.patchValue({
      dbu:this.bu
      });
  }
  remove1()
  {
    this.myForm.patchValue({
      dbu:''
      });
  }

  modify1(str:string)
  {
  this.access = str;
  }

  goback()
  {
    this.router.navigate(['']);
  }

  modit()
  {
    this.auth.deletecheck(this.numid).subscribe(datauser => {
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
    });
    }


}
