import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";
 
@Injectable({
    providedIn:'root'
})
export class ParticipanteService{
 
    private url:string;
 
    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }
 
    getParticipantes():Observable<any>{
        return this._http.get(this.url + 'participante');
    }
 
    getParticipanteById(id:number):Observable<any>{
        return this._http.get(this.url + 'participante/' + id);
    }
 
    getReservasByCliente(id:number):Observable<any>{
        return this._http.get(this.url + 'participante/cliente/' + id);
    }
 
    getParticipantesByReserva(id:number):Observable<any>{
        return this._http.get(
            this.url + 'participante/reserva/' + id
        );
    }

    getReservasDisponiblesParaFacturar(): Observable<any> {
    return this._http.get(
        this.url + 'participante/disponibles-facturar');
    }
 
    getParticipantesSinFacturaByReserva(id:number):Observable<any>{
        return this._http.get(
            this.url + 'participante/reserva/' + id + '/sin-factura'
        );
    }
 
}
 