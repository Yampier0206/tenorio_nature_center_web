import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class ClienteService{

    private url:string;
    private headers:any;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
        this.headers = new HttpHeaders().set('Content-Type','application/json');
    }

    getClientes():Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.get(
            this.url + 'cliente',
            { headers }
        );
    }

    getClienteById(id:number):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.get(
            this.url + 'cliente/' + id,
            { headers }
        );
    }

    getClienteByUsuario(id:number):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.get(
            this.url + 'cliente/usuario/' + id,
            { headers }
        );
    }

    createCliente(data:any):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.post(
            this.url + 'cliente',
            data,
            { headers }
        );
    }

    updateCliente(data:any):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.put(
            this.url + 'cliente',
            data,
            { headers }
        );
    }

    deleteCliente(id:number):Observable<any>{

        const token = sessionStorage.getItem('token');

        const headers = new HttpHeaders({
            'Content-Type':'application/json',
            'Authorization':'Bearer ' + token
        });

        return this._http.delete(
            this.url + 'cliente/' + id,
            { headers }
        );
    }

}