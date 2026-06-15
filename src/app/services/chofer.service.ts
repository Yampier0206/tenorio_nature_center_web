import { HttpClient} from "@angular/common/http";
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

    getChoferes(): Observable<any> {
        return this._http.get(this.url + 'chofer');
    }

    getChoferById(id: number): Observable<any> {
        return this._http.get(this.url + 'chofer/' + id);
    }

    createChofer(data: any): Observable<any> {
        return this._http.post(
            this.url + 'chofer',
            data);
    }

    updateChofer(data: any): Observable<any> {
        return this._http.put(
            this.url + 'chofer',
            data);
    }

    deleteChofer(id: number): Observable<any> {
        return this._http.delete(
            this.url + 'chofer/' + id);
    }
}
