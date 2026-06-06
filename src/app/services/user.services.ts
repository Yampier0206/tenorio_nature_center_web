import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable ({providedIn:'root'})
    export class UserServices{
        private readonly url:string
        constructor(
            private _http:HttpClient
        ){
            this.url=enviroment.apiUrl
        }
        createUser(user:User):Observable<any>{
            let data=JSON.stringify(user)
            let headers=new HttpHeaders().set('content-Type','application/json')
            let options={headers}
            return this._http.post(this.url+'user/register',data,options)
        }
       uploadImage(data:any):Observable<any>{
        //let headers=new HttpHeaders().set('content-Type','image/jpg')
        return this._http.post(this.url+'user/upload',data)
       }
    }