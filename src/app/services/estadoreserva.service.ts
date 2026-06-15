import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class EstadoReservaService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getEstadosReserva():Observable<any>{

        return this._http.get(
            this.url + 'estadoreserva'
        );
    }

    getEstadoReservaById(id:number):Observable<any>{

        return this._http.get(
            this.url + 'estadoreserva/' + id
        );
    }

    createEstadoReserva(data:any):Observable<any>{
        return this._http.post(
            this.url + 'estadoreserva',
            data);
    }

    updateEstadoReserva(data:any):Observable<any>{
        return this._http.put(
            this.url + 'estadoreserva',
            data);
    }

    deleteEstadoReserva(id:number):Observable<any>{
        return this._http.delete(
            this.url + 'estadoreserva/' + id);
    }

}