import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../enviroments";
import { Observable } from "rxjs";
import { Post } from "../models/post";

@Injectable({providedIn:'root'})
export class PostService{
    private readonly url:string
    constructor(private _http:HttpClient){
        this.url=enviroment.apiUrl
    }
    getPosts():Observable<any>{
        return this._http.get(this.url+"post")
    }
    getPostsByCategory(categoryId: string): Observable<Post[]> {
        return this._http.get<Post[]>(`${this.url}post/${categoryId}`);
    }
}