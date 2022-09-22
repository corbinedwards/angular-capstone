import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from '../models/band';
import { Label } from '../models/label';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  readonly urlAllBands: string = 'http://127.0.0.1:8082/api/groups';
  readonly urlBandsByOrg: string = 'http://127.0.0.1:8082/api/groups/byorganization/';
  readonly urlLabels: string = 'http://localhost:8082/api/organizations';

  constructor(private http: HttpClient) { }

  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.urlLabels);
  }

  getAllBands(): Observable<Band[]> {
    return this.http.get<Band[]>(this.urlAllBands)
  }

  getBandsByOrg(organizationId: string): Observable<Band[]> {
    return this.http.get<Band[]>(this.urlBandsByOrg + organizationId);
  }
}
