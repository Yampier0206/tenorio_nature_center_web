import { Component, Signal } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { audit } from 'rxjs';
import { enviroment } from 'src/app/enviroments';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  public user : any
  public url:string
  constructor(private _auth:AuthService){
    this.user=_auth.currentUser()
    this.url=enviroment.apiUrl
  }
}
