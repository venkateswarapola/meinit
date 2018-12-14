import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addb',
  templateUrl: './addb.component.html',
  styleUrls: ['./addb.component.css']
})
export class AddbComponent implements OnInit {
  myForm: FormGroup;
  data;
  access:string;
  bu:string;
  asbu:string;
  de:string;
  dd:string;
  kin:string = ' ' ;
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
      firstname: new FormControl({value:this.data[0].b_user_fn,disabled: true}, Validators.required),
      lastname: new FormControl({value:localStorage.getItem(this.data[0].b_user_fn),disabled: true}, Validators.required),
      id: new FormControl({value:this.data[0].b_user_id,disabled: true}, Validators.required),
      email: new FormControl({value:this.data[0].b_user_mail,disabled: true}, Validators.required),
      opti123:  new FormControl({value:this.data[0].b_user_role,disabled: true}, Validators.required),
      dbu: new FormControl({value:localStorage.getItem('dbu' + this.data[0].b_user_fn),disabled: true}, Validators.required),
      abu: new FormControl({value: localStorage.getItem('abu' + this.data[0].b_user_fn),disabled: false}, Validators.required)
      });
      this.dd= localStorage.getItem('abu' + this.data[0].b_user_fn); 

  }  
  modify(str:string)
  {
  this.bu = str;
  this.kin =this.kin+ str +'\n';
  this.asbu =this.kin;
  }

  adding1()
  {
    this.de=this.dd
    this.myForm.patchValue({
      abu:this.de+this.asbu
      });
  }
  remove1()
  {
    this.myForm.patchValue({
      abu:''
      });
      this.asbu = ' ';
      this.kin = ' ';
      this.dd=' '; 
  
  }

  goback()
  {
    this.router.navigate(['abu']);
  }

  modit()
  {
    this.auth.deletecheck(this.numid).subscribe(datauser => {
      this.auth.
      putuser(this.data[0].b_user_fn + localStorage.getItem(this.data[0].b_user_fn),this.data[0].b_user_id
        ,this.data[0].b_user_mail,this.data[0].b_user_role,this.data[0].b_user_title,this.data[0].b_user_fn)
      .subscribe(data123 => {
      this.data = data123;
      localStorage.setItem(this.data[0].b_user_fn, localStorage.getItem(this.data[0].b_user_fn));
      localStorage.setItem('dbu'+ this.data[0].b_user_fn,localStorage.getItem('dbu' + this.data[0].b_user_fn),);
      localStorage.setItem('abu'+ this.data[0].b_user_fn,this.myForm.value.abu);
        if(this.data)
        this.router.navigate(['abu']);
        });
    });
    }


}
