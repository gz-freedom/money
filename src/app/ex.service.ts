import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExService {
  uri = 'http://localhost:4000/';

  constructor(private http: HttpClient) { }

  getCurrentExpenditure() {
    return this.http.get(`${this.uri}?year=2018&month=3`);
  }
}
