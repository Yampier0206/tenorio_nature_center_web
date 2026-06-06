import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})export class CategoryService{
    private url:string
    private headers:any
    constructor(private _http:HttpClient){
        this.url=enviroment.apiUrl
        this.headers=new HttpHeaders().set('Content-Type','application/json')
    }
    getCategories():Observable<any>{
        return this._http.get(this.url+'category',this.headers)
    }
}