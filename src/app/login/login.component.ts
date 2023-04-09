import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authSrv: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    const username = f.value.username;
    const password = f.value.password;

    this.authSrv.login({username: username, password: password}).subscribe(data => {
      console.log(data);
      this.authSrv.createUser(data.token, data.type, data.id, data.username, data.email, data.roles, data.expirationTime);
      localStorage.setItem('user', JSON.stringify(this.authSrv.user))
      window.location.reload();
    });
    this.navigate();
  }

  navigate(){
    console.log('navigate to home')
    this.router.navigate([""])
  }
}
