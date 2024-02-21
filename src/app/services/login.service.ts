
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { Admins } from '../interfaces/admins';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://back-server-a19dd-default-rtdb.firebaseio.com/admins.json'; 

  constructor(private http: HttpClient) { }
  login(admin:Admins){
    return this.http.post <Admins> (this.apiUrl,{
      username:admin.username,
      password:admin.password,
      role:admin.role,
     
    })
  }
}
  
  /*fetchall(){
    return this.http.get <{[key: string] : Admins}>(this.apiUrl ,
      )
    .pipe(
      map((admin)=>{
        const adminsArray : Admins []= []
        for (const key in admin) {
          if (admin.hasOwnProperty(key)) {
            adminsArray.push({ ...admin[key]})
          }
        }
        return Object.values(adminsArray);
      })
    )
  }
}
*/


 