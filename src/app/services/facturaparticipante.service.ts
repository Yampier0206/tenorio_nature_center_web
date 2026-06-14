import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn: 'root'
})
export class FacturaParticipanteService {

    private url: string;

    constructor(private _http: HttpClient) {
        this.url = enviroment.apiUrl;
    }

    createFacturaParticipante(data: any): Observable<any> {
        return this._http.post(
            this.url + 'facturaparticipante',
            data);
    }
    
}