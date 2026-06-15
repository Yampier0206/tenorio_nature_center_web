import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class EmpresaClienteService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getEmpresasCliente():Observable<any>{

        return this._http.get(
            this.url + 'empresacliente'
        );
    }

    getEmpresaClienteById(id:number):Observable<any>{

        return this._http.get(
            this.url + 'empresacliente/' + id
        );
    }

    createEmpresaCliente(data:any):Observable<any>{
        return this._http.post(
            this.url + 'empresacliente',
            data);
    }

    updateEmpresaCliente(data:any):Observable<any>{
        return this._http.put(
            this.url + 'empresacliente',
            data);
    }

    deleteEmpresaCliente(id:number):Observable<any>{
        return this._http.delete(
            this.url + 'empresacliente/' + id);
    }

}