import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private Uri: string = 'http://localhost:8080/v1/api/login';

  constructor(private http: HttpClient) { }

  signIn = (model: any) => {
    return this.http.post(this.Uri, JSON.stringify(model), 
    { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  };

}
