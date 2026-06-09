import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({ providedIn: 'root' })
export class IdiomaGuiaService {
    private url: string;

    constructor(private _http: HttpClient) {
        this.url = enviroment.apiUrl;
    }

    private getHeaders(): HttpHeaders {
        const token = sessionStorage.getItem('token');
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        });
    }

    getIdiomasByGuia(idGuia: number): Observable<any> {
        return this._http.get(
            this.url + 'idiomaguia/guia/' + idGuia,
            { headers: this.getHeaders() }
        );
    }
    addIdiomaToGuia(idGuia: number, idIdioma: number): Observable<any> {
    const payload = { 
        idguia: Number(idGuia), 
        ididioma: Number(idIdioma) 
    };
        return this._http.post(
        this.url + 'idiomaguia',
        payload,
        { headers: this.getHeaders() }
    );
}

    deleteIdiomaFromGuia(idIdiomaguia: number): Observable<any> {
        return this._http.delete(
            this.url + 'idiomaguia/' + idIdiomaguia,
            { headers: this.getHeaders() }
        );
    }
}