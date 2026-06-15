import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class GuiaService{

    private url:string;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getGuias():Observable<any>{
        return this._http.get(this.url + 'guia');
    }

    getGuiaById(id:number):Observable<any>{
        return this._http.get(this.url + 'guia/' + id);
    }

    createGuia(data:any):Observable<any>{
        return this._http.post(this.url + 'guia', data);
    }

    updateGuia(data:any):Observable<any>{
        return this._http.put(this.url + 'guia', data);
    }

    deleteGuia(id:number):Observable<any>{
    return this._http.delete(this.url + 'guia/' + id);
}

}
