import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class ClienteService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getClientes():Observable<any>{
        return this._http.get(this.url + 'cliente');
    }

    getClienteById(id:number):Observable<any>{
        return this._http.get(this.url + 'cliente/' + id);
    }

    getClienteByUsuario(id:number):Observable<any>{
        return this._http.get(this.url + 'cliente/usuario/' + id);
    }

    createCliente(data:any):Observable<any>{
        return this._http.post(this.url + 'cliente', data);
    }

    updateCliente(data:any):Observable<any>{
        return this._http.put(this.url + 'cliente', data);
    }

    deleteCliente(id:number):Observable<any>{
        return this._http.delete(this.url + 'cliente/' + id);
    }

}