import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private BaseUrl: string = 'http://localhost:8080/v1/api/customers';
  private Token: string;
  
  public customers = [];
  public model = { };
  public createdCustomer = false;
  public customerDetails = null;

  constructor(private http: HttpClient) { 
    this.Token =  localStorage.getItem('token') || '';
    this.model = { id: 0, firstName: '', lastName: '', phone: '', cpf: '', rg: '', address: '', email: '', gender: '' };
    this.loadCustomers();
  }

  loadCustomers = () => {
    this.getCustomers()
      .subscribe(response => this.customers = response['content']);
  }

  getCustomers = (page = 1) => {
    return this.http.get<Array<any>>(`${this.BaseUrl}?page=${page}`, { headers: new HttpHeaders({ 
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.Token}`, 
      }) 
    });
  }

  getCustomersByGender = (gender = 'F', page = 1) => {
    return this.http.get<Array<any>>(`${this.BaseUrl}/gender/${gender}?page=${page}`, { headers: new HttpHeaders({ 
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.Token}`, 
      }) 
    });
  }

  postCustomer(customer: any) {
    return this.http.post(this.BaseUrl, JSON.stringify(customer), {
      headers: new HttpHeaders({ 
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.Token}`, 
      })
    })
  }
  
  putCustomer(customer: any) {
    return this.http.put(`${this.BaseUrl}/${customer.id}`, JSON.stringify(customer), {
      headers: new HttpHeaders({ 
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.Token}`, 
      })
    })
  }

  deleteCustomer(id) {
    return this.http.delete(`${this.BaseUrl}/${id}`, {
      headers: new HttpHeaders({ 
        'Content-type': 'application/json',
        'Authorization': `Bearer ${this.Token}`, 
      })
    })
  }
}
