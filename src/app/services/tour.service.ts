import { HttpClient} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { enviroment } from "../enviroments";

@Injectable({
    providedIn:'root'
})
export class TourService{

    private url:string;
    private headers:any;

    constructor(private _http:HttpClient){
        this.url = enviroment.apiUrl;
    }

    getTours():Observable<any>{
        return this._http.get(
            this.url + 'tour'
        );
    }

    getTourById(id:number):Observable<any>{
        return this._http.get(
            this.url + 'tour/' + id
        );
    }

    createTour(data:any):Observable<any>{
    return this._http.post(
        this.url + 'tour',
        data
    );
}

updateTour(data:any):Observable<any>{

    return this._http.put(
        this.url + 'tour',
        data
    );
}

deleteTour(id:number):Observable<any>{
    return this._http.delete(
        this.url + 'tour/' + id);
}

}