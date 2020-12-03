import { Component, OnInit } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';

//import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginInfo;
  loginForm;
  loginFailed: boolean = false;
  
  constructor(
    /*private loginService: LoginService,
    private formBuilder: FormBuilder*/
  ) {
    /*this.loginForm = this.formBuilder.group({
      username: '',
      password: ''
    });*/
   }

  ngOnInit() {
    //this.loginInfo = this.loginService.getInfo();
  }

  /*onLogin() {
    var username = document.getElementById("username");
    var password = document.getElementById("password");

    this.loginInfo.username = username.innerText;
    this.loginInfo.password = password.innerText;

    let loggedIn = this.loginService.performLogin(username.innerText,password.innerText);
    this.loginForm.reset();

    console.log(this.loginInfo.username, this.loginInfo.password);
    return loggedIn;
  }*/

  tryLogin() {
    var username = document.getElementById("username").innerText;
    var password = document.getElementById("password").innerHTML;

    if (username == 'tataemp' && password == 'pass@123')
      return true;
    return false
  }
}
