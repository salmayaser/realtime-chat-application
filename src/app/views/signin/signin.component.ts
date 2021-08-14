import { AuthService } from './../../_services/auth.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  error: string
  loader: boolean = false

  constructor(private _auth: AuthService, private router: Router) { }

  signIn(formData: { username: string, password: string }) {
    let username = formData.username;
    let password = formData.password;
    this.loader = true
    this._auth.login(username, password)
      .subscribe((res: any) => {
        this.loader = false
        let tokenDecode: any = atob(res.data.login.token.split('.')[1])
        localStorage.setItem("token", res.data.login.token)
        localStorage.setItem('username', JSON.parse(tokenDecode).username)
        this.router.navigate(['/home'])
      },
        (err) => {
          this.error = err.message
          this.loader = false
        }

      )



  }
  ngOnInit(): void {
  }

}
