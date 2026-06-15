import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class VehiculoService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getVehiculos():Observable<any>{
        return this._http.get(
            this.url + 'vehiculo');
    }

    getVehiculoById(id:number):Observable<any>{
        return this._http.get(
            this.url + 'vehiculo/' + id);
    }

    createVehiculo(data:any):Observable<any>{
        return this._http.post(
            this.url + 'vehiculo',
            data);
    }

    updateVehiculo(data:any):Observable<any>{
        return this._http.put(
            this.url + 'vehiculo',
            data);
    }

    deleteVehiculo(id:number):Observable<any>{
        return this._http.delete(
            this.url + 'vehiculo/' + id);
    }

}