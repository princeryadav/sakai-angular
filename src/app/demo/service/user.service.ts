import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../api/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.url;
  constructor(private http:HttpClient) { }

  register(register:User){
    return this.http.post(this.url +"",register); // ZycaraAdmin/UserRegistration
  }
  login(login:User){
    return this.http.post(this.url+"",login); // api/ZycaraAdmin/Login
  }
  getUsers(){
    return this.http.get(this.url+""); // ZycaraAdmin/GetAllUser
  }
}
