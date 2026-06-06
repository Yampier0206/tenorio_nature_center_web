import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class UbicacionService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getUbicaciones():Observable<any>{
    return this._http.get(this.url + 'ubicacion');
    }

    getUbicacionById(id:number):Observable<any>{
        return this._http.get(this.url + 'ubicacion/' + id);
    }

    createUbicacion(ubicacion:any):Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.post(this.url + 'ubicacion', ubicacion, { headers });
    }

    updateUbicacion(ubicacion:any):Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.put(this.url + 'ubicacion', ubicacion, { headers });
    }

    deleteUbicacion(id:number):Observable<any>{
        const token = sessionStorage.getItem('token');
        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });
        return this._http.delete(this.url + 'ubicacion/' + id, { headers });
    }
}