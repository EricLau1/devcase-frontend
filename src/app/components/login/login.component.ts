import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model = {};
  message = '';

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.model = {
      email: '',
      password: ''
    };  
  }

  signIn() {
    this.loginService.signIn(this.model)
      .subscribe( response => {
        localStorage.setItem('token', response['token']);
        this.router.navigate(['/admin']);
      },
      errors => this.message = errors.error.message);
  }
}
