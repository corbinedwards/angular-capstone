import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from '../models/band';
import { Label } from '../models/label';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class BandsService {

  readonly urlBands: string = 'http://127.0.0.1:8082/api/groups';
  readonly urlBandsByOrg: string = 'http://127.0.0.1:8082/api/groups/byorganization';
  readonly urlLabels: string = 'http://localhost:8082/api/organizations/';

  constructor(private http: HttpClient) { }

  addMember(groupId: number, newMember: Member): Observable<Member> {
    const urlSaveMember = `${this.urlBands}/${groupId}/members`;
    return this.http.post<Member>(urlSaveMember, newMember);
  }

  createNewBand(newBand: Band): Observable<Band> {
    return this.http.post<Band>(this.urlBands, newBand);
  }

  getAllBands(): Observable<Band[]> {
    return this.http.get<Band[]>(this.urlBands)
  }

  getBandsByOrg(organizationId: string): Observable<Band[]> {
    return this.http.get<Band[]>(`${this.urlBandsByOrg}/${organizationId}`);
  }

  getBandById(bandId: string): Observable<Band> {
    return this.http.get<Band>(`${this.urlBands}/${bandId}`);
  }

  getLabels(): Observable<Label[]> {
    return this.http.get<Label[]>(this.urlLabels);
  }

}
