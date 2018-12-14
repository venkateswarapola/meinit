import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl  } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-abu',
  templateUrl: './abu.component.html',
  styleUrls: ['./abu.component.css']
})
export class AbuComponent implements OnInit {
  myForm: FormGroup;
  data;
  data1;
  data123;
  bool:boolean = true;
  str:string = "No User";
  dcount:number;
pno:number = 0;
pages:number;
page:number = 0;
limit:number = 2;
totpage:number = 0;
exist:string;
med:boolean = true;
pageno = [2,3,4,5];


  constructor(private router: Router,private auth:AuthService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createform();
    this.getpeers();
    this.count();
    this.tot();
    //$('#myModal').modal('show');
  }

  createform()
{
    this.myForm = this.formBuilder.group({
      useremail: this.formBuilder.array([])
    });
}

view(id:number)
{
  this.auth.getuser(id).subscribe(data123 => {
    this.data1 = data123
    });
}

setpage(p,event:any)
{
	event.preventDefault();
	this.pno = p;
	if(p!=0)
		p=this.limit*p;
	this.page = p;
	this.getpeers();
}
setpageleft(event:any)
{
	event.preventDefault();
	if(this.pno>0)
	{
	this.pno = this.pno-1;
	var p = this.pno;
	if(p!=0)
		p=this.limit*p;
	this.page = p;
	this.getpeers();
	}	
}
setpageright(event:any)
{
	event.preventDefault();
	if(this.pno<this.totpage-1)
	{
	this.pno = this.pno+1;
	var p = this.pno;
	console.log(p);
	if(p!=0)
		p=this.limit*p;
	this.page = p;
	this.getpeers();
	}
}

getpeers()
{
	this.auth.getpeep(this.limit,this.page).subscribe(data123 => {
    this.data = data123
    if(this.data == '')
    this.bool = false;
    });
}

getpeers123()
{
	this.auth.getpeep(this.limit,0).subscribe(data123 => {
		this.data = data123
    });
}

  count()
  {
      this.auth.pages(this.limit).subscribe(datauser => {
      this.pages = datauser
    });
  }

  tot()
  {
      this.auth.totpage(this.limit).subscribe(data123 => {
      this.totpage = data123
      });
  }

  onChange123(id: number, isChecked: boolean) {
  	const emailFormArray = <FormArray>this.myForm.controls.useremail;

    if (isChecked) {
      emailFormArray.push(new FormControl(id));
    } else {
      let index = emailFormArray.controls.findIndex(x => x.value == id)
      emailFormArray.removeAt(index);
    }
  	}

checkdelete()
  	{
      if(this.myForm.value.useremail.length>0)
      {
        const emailFormArray = <FormArray>this.myForm.controls.useremail;
        this.dcount = this.myForm.value.useremail.length;
        for(var i =0;i<this.dcount;i++)
        {
  		  this.auth.deletecheck(this.myForm.value.useremail[i]).subscribe(datauser => {
        emailFormArray.removeAt(this.myForm.value.useremail[i]);
        this.data = datauser;
        if(this.data == '')
        this.bool = false;
        this.count();
  			this.getpeers123();
		  });
      }
      
      }
      else
      {
        alert("no user selected to deleted");
      }
    }
    
    values = '';

  onKey(event: any) { // without type info
    this.values = event.target.value ;
    if(this.values!='')
    {
		this.med = true;
    	this.auth.check(this.values,this.limit).subscribe(datauser => {
    		if(datauser!='')
    		{
    			this.data = datauser
    		}
    		else
    		{
    			this.exist = "there is no such user!!";
          this.med = false;
    		}

		});
    }
    else
    {
    	this.auth.getpeep(this.limit,this.page).subscribe(data123 => {
		this.data = data123,
    this.med = true;
    });
    }
}

onChange(np:number)
{
    this.limit = np;
    this.page = 0;
    this.pno = 0;
    this.auth.getpeep(this.limit,this.page).subscribe(data123 => {
    this.data = data123,
    console.log(this.data),
    console.log(typeof this.data),
    this.med = true;
    });
    this.count();
    this.tot();
}

addb()
{
  if(this.myForm.value.useremail.length == 1)
  {
    const emailFormArray = <FormArray>this.myForm.controls.useremail;
    var ran = Math.floor(10000 + Math.random() * 90000);
    this.auth.modifycheck(this.myForm.value.useremail[0]).subscribe(datauser => {
      emailFormArray.removeAt(this.myForm.value.useremail[0]);
      this.data123 = datauser;
      if(this.auth.info(this.data123))
      this.router.navigate(['addb']);
    });
  }
  else if(this.myForm.value.useremail.length == 0)
  {
    alert("no user selected to add");
  }
  else
  {
    alert("Atmost one user can be ")
  }
}

}
