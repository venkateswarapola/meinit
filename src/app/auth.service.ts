import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  f:string;
  l:string;
  i:number;
  e:string;
  o:string;
  au:string;
  du:string;
  ac:string;
data321;
signedupstatus = JSON.parse(localStorage.getItem('signedup'+JSON.parse(localStorage.getItem("pages"))+JSON.parse(localStorage.getItem("limits"))) || 'false');

  constructor(private http: HttpClient) { }

private baseUrl = 'http://localhost:8080';


  putuser(b_user_name:string,b_user_id:number,b_user_mail:string,b_user_role:string,b_user_title:string,b_user_fn:string): Observable<any>
  {
    var d = new Date();
    var b_mkr_date = '';
    b_mkr_date += d.getDate().toString() + '-';
    b_mkr_date += (d.getMonth()+1).toString() + '-';
    b_mkr_date += d.getFullYear().toString();
    var b_ckr_date = '';
    b_ckr_date += d.getDate().toString() + '-';
    b_ckr_date += (d.getMonth()+1).toString() + '-';
    b_ckr_date += d.getFullYear().toString();
    var b_user_status = 'V';
    var b_user_action = 'I';
    var b_unit_id = Math.floor(10000 + Math.random() * 90000);
    var b_mkr_id = Math.floor(10000 + Math.random() * 90000);
    var b_ckr_id = Math.floor(10000 + Math.random() * 90000);
    console.log(typeof b_user_id,b_user_id);
    return this.http.post(`${this.baseUrl}` + `/create`,{b_user_id,b_unit_id,b_user_name,b_user_role,b_mkr_id,b_mkr_date,b_ckr_id,b_ckr_date,b_user_title,b_user_fn,b_user_mail,b_user_status,b_user_action});
  }

deletecheck(id:number): Observable<any>
{
  return this.http.delete(`${this.baseUrl}/checkdelete/${id}`);
}
pages(limit:number): Observable<any>
{
  return this.http.get(`${this.baseUrl}/totpage/${limit}`);
}
getpeep(limit:number,offset:number): Observable<any>
{
  return this.http.get(`${this.baseUrl}/pages/${limit}/${offset}`);
}
totpage(limit:number): Observable<any>
{
return this.http.get(`${this.baseUrl}/count/${limit}`);
}

check(search:string,limit:number): Observable<any>
{
  return this.http.get(`${this.baseUrl}/userdet/${search}/${limit}`);
}

info(data321:any)
{
  this.data321 = data321;
  localStorage.setItem('modify' + this.data321[0].b_user_fn,JSON.stringify(this.data321));
  return true;
}

getinfo()
{
  return JSON.parse(localStorage.getItem('modify' + this.data321[0].b_user_fn));
}

modifycheck(id:number)
{
  return this.http.get(`${this.baseUrl}/moduser/${id}`);
}

getuser(id:number): Observable<any>
{
  return this.http.get(`${this.baseUrl}/get/${id}`);
}

}
