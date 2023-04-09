import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';
import { Userc } from './model/userConstructor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  user: User | any

  ngOnInit(): void {
    console.log("app: ng on init")
   this.getUserDetails();
  }

  title = 'Capstone';

  constructor(private router: Router) {}

  getUserDetails(){
    if(localStorage.getItem("user") != null) {
      let userLogged: any = localStorage.getItem("user");
      this.user = JSON.parse(userLogged);
      console.log("user details")
    }
  }

  login(){
    this.router.navigate(['/login']);
  }

  logout() {
    localStorage.removeItem("user");
    //this.router.navigate(['/login']);
    window.location.reload();
    //this.router.navigate(['']);
  }
}
