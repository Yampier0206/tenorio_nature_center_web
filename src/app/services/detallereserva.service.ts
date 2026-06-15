import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class DetalleReservaService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getDetallesReserva():Observable<any>{

        return this._http.get(
            this.url + 'detallereserva'
        );
    }

    getDetalleReservaById(id:number):Observable<any>{

        return this._http.get(
            this.url + 'detallereserva/' + id
        );
    }

    createDetalleReserva(data:any):Observable<any>{
        return this._http.post(
            this.url + 'detallereserva',
            data);
    }

    updateDetalleReserva(data:any):Observable<any>{
        return this._http.put(
            this.url + 'detallereserva',
            data);
    }

    deleteDetalleReserva(id:number):Observable<any>{
        return this._http.delete(
            this.url + 'detallereserva/' + id);
    }

}