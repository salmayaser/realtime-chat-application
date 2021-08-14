import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {


  error: string
  loader: boolean = false

  constructor(private _auth: AuthService, private router: Router) { }

  signIn(formData: { username: string, password: string }) {
    let username = formData.username;
    let password = formData.password;
    this.loader = true
    this._auth.register(username, password)
      .subscribe((res: any) => {
        this.loader = false
        let tokenDecode: any = atob(res.data.createUser.token.split('.')[1])
        localStorage.setItem("token", res.data.createUser.token)
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
