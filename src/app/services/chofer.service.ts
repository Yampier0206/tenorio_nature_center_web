import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn: 'root'
})
export class ChoferService {

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

    getChoferes(): Observable<any> {
        return this._http.get(this.url + 'chofer', { headers: this.getHeaders() });
    }

    getChoferById(id: number): Observable<any> {
        return this._http.get(this.url + 'chofer/' + id, { headers: this.getHeaders() });
    }

    createChofer(data: any): Observable<any> {
        return this._http.post(
            this.url + 'chofer',
            data,
            { headers: this.getHeaders() }
        );
    }

    updateChofer(data: any): Observable<any> {
        return this._http.put(
            this.url + 'chofer',
            data,
            { headers: this.getHeaders() }
        );
    }

    deleteChofer(id: number): Observable<any> {
        return this._http.delete(
            this.url + 'chofer/' + id,
            { headers: this.getHeaders() }
        );
    }
}