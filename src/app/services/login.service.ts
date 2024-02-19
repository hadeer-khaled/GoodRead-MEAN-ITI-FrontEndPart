import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Admins } from '../interfaces/admins';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(admin:Admins){
    return this.http.post('http://localhost:4200/admin',admin)
  }

}
 