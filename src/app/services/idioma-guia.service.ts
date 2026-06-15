import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../enviroments';

@Injectable({
  providedIn: 'root'
})
export class IdiomaGuiaService {

  private url: string;

  constructor(private http: HttpClient) {
    this.url = enviroment.apiUrl;
  }

  getIdiomasByGuia(id: number): Observable<any> {
    return this.http.get(
      this.url + 'idiomaguia/guia/' + id
    );
  }

  addIdiomaToGuia(idGuia: number, idIdioma: number): Observable<any> {
    const payload = {
      idguia: Number(idGuia),
      ididioma: Number(idIdioma)
    };
    return this.http.post(
      this.url + 'idiomaguia',
      payload);
  }

  getIdiomaGuiaById(id: number): Observable<any> {
    return this.http.get(this.url + 'idiomaguia/' + id);
  }

  createIdiomaGuia(data: any): Observable<any> {
    return this.http.post(
      this.url + 'idiomaguia',
      data);
  }

  deleteIdiomaGuia(id: number): Observable<any> {
    return this.http.delete(
      this.url + 'idiomaguia/' + id);
  }
}
