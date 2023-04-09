import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user';
import { Userc } from '../model/userConstructor';
import { Appointment } from '../model/appointment';
import { Observable } from 'rxjs';
import { userDocPat } from '../model/userDocPat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Userc | undefined;
  appointents : Appointment[] | undefined;

  constructor(private http: HttpClient) { }

  login(user: {}) {
    return this.http.post<User>("http://localhost:9090/auth/login", user);
  }

  getData() {
    return this.http.get<userDocPat[]>("http://localhost:9090/page/users");
  }

  getDocs() {
    return this.http.get<userDocPat[]>("http://localhost:9090/page/docs");
  }

  getUserById(id:number){
    return this.http.get<userDocPat>("http://localhost:9090/page/user/"+id)
  }

  getDocById(id:number){
    return this.http.get<userDocPat>("http://localhost:9090/page/doc/"+id)
  }


  getPatientById(id:number){
    return this.http.get<userDocPat>("http://localhost:9090/page/patient/"+id)
  }

  createUser(token: string, type: string, id: number, username: string, email: string, roles: string[], expirationTime: Date) {
    this.user = new Userc(token, type, id, username, email, roles, expirationTime);
  }

  updateUserById(id:number, patient:Partial<userDocPat>){
    return this.http.put<userDocPat>("http://localhost:9090/page/update/user/"+id, patient)
  }

}
