import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class IdiomaService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getIdiomas():Observable<any>{

        return this._http.get(
            this.url + 'idioma'
        );
    }

    getIdiomaById(id:number):Observable<any>{

        return this._http.get(
            this.url + 'idioma/' + id
        );
    }

    createIdioma(data:any):Observable<any>{
        return this._http.post(
            this.url + 'idioma',
            data);
    }

    updateIdioma(data:any):Observable<any>{
        return this._http.put(
            this.url + 'idioma',
            data);
    }

    deleteIdioma(id:number):Observable<any>{
        return this._http.delete(
            this.url + 'idioma/' + id);
    }

}