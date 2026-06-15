import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class ReservaService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getReservas():Observable<any>{
        return this._http.get(
            this.url + 'reserva'
        );
    }

    getReservaById(id:number):Observable<any>{
        return this._http.get(
            this.url + 'reserva/' + id
        );
    }

    createReserva(data:any):Observable<any>{
        return this._http.post(
            this.url + 'reserva',
            data
        );
    }

    updateReserva(data:any):Observable<any>{
        return this._http.put(
            this.url + 'reserva',
            data);
    }

    deleteReserva(id:number):Observable<any>{
        return this._http.delete(
            this.url + 'reserva/' + id);
    }

    createReservaCompleta(data:any):Observable<any>{
        return this._http.post(
            this.url + 'reserva/completa',
            data);

    }

    getReservasCompletas(){
        return this._http.get(
            this.url + 'reserva/completa');
    }

    updateReservaCompleta(data:any):Observable<any>{
        return this._http.put(
            this.url + 'reserva/completa',
            data);
    }

}