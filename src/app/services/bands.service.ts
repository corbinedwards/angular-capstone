import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from '../models/band';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  readonly urlAllBands: string = 'http://127.0.0.1:8082/api/groups';

  constructor(private http: HttpClient) { }

  getAllBands(): Observable<Band[]> {
    return this.http.get<Band[]>(this.urlAllBands)
  }
}
