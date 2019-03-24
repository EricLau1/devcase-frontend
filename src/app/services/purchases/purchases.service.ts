import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PurchasesService {

  private BaseUrl: string = 'http://localhost:8080/v1/api/purchases';
  private Token: string = '';

  public purchase = null;
  public isPurchased = false;

  constructor(private http: HttpClient) { 
    this.Token = localStorage.getItem('token') || '';
    this.purchase = { customer: null, cashSpent: 0.0 };
  }

  getPurchases = (page = 1) => {
    return this.http.get<Array<any>>(`${this.BaseUrl}?page=${page}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.Token}`
      })
    });
  }
  
  getPurchasesByGender = (gender = 'F', page = 1) => {
    return this.http.get<Array<any>>(`${this.BaseUrl}/gender/${gender}?page=${page}`, {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.Token}`
      })
    });
  }

  postPurchase = (customerId: number, cashSpent: number) => {
    let data = { 'cashSpent': cashSpent }
    return this.http.post(`${this.BaseUrl}/customer/${customerId}`, JSON.stringify(data), {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.Token}`
      })
    });
  }
}
