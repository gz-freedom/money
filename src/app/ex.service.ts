import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExService {
  uri = 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  getCurrentExpenditure(y, m) {
    return this.http.get(`${this.uri}/?year=${y}&month=${m}`);
  }

  addExpenditure(obj) {
    return this.http.post(`${this.uri}/addMonth`, obj);
  }

  updateExpenditure(dayExpenditure, currentTotal, id) {
    let obj = {
      dayExpenditure: dayExpenditure,
      currentTotal: currentTotal
    };
    return this.http.post(`${this.uri}/update/${id}`, obj);
  }
}
