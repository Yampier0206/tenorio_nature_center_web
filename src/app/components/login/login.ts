import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  public status:number
  public user:User
  
  constructor(
    private _authService:AuthService,
    private _router:Router
  ){
    this.status=-1
    this.user=new User(1,"","","","","","")
  }

  onSubmit(form:any){
    console.log("Formulario activado")
    console.log(this.user.email)
    this._authService.login(this.user).subscribe({
      next:(response:LoginResponse)=>{        
        if(response.access_token.length>0){
          console.log("Exito")
          this._router.navigate([''])
        }else{
          console.log("Error")
          this.changeStatus(0)
        }
      },
      error:(err:Error)=>{
        console.log("Error Server")
        this.changeStatus(1)
      }
    })

  }
  changeStatus(value:number){
    console.log("Estado>",value)
    this.status=value
    let countdown=timer(4000)
    countdown.subscribe(n=>{
      this.status=-1
      console.log("Estado inicial")
    })
  }
}
