import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../services/customers/customers.service';
import { PurchasesService } from '../../services/purchases/purchases.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customers: Array<any> = [];

  totalCustomers = 0;
  totalFemaleCustomers = 0;
  totalMaleCustomers = 0;
  
  totalPurchases = 0;
  totalFemalePurchases = 0;
  totalMalePurchases = 0;

  currentPage = 1;
  totalPages = 0;
  
  constructor(private customersService: CustomersService,
    private purchasesService: PurchasesService,
    private toastr: ToastrManager) { 
      setInterval(() => {
        if(this.purchasesService.isPurchased) {
          this.toastr.infoToastr('As informações foram atualizadas!', 'Atualização das tabelas');
          this.loadAll();
          this.purchasesService.isPurchased = !this.purchasesService.isPurchased;
        }
      }, 5000);
    }

  ngOnInit() {
    this.loadAll();
  }

  loadAll = () => {
    this.loadFemaleCustomers();
    this.loadMaleCustomers();
    this.loadAllCustomers();
    this.loadAllPurchases();
    this.loadFemalePurchases();
    this.loadMalePurchases();
  }

  loadAllCustomers = () => {
    this.customersService
      .getCustomers(this.currentPage)
      .subscribe(response => {
        this.totalPages = response['totalPages'];
        this.customers = response['content'];
        this.totalCustomers = response['totalElements'];
      },
      errors => console.log(errors));
  }

  loadFemaleCustomers = () => {
    this.customersService
    .getCustomersByGender('F')
    .subscribe(response => {
      this.totalFemaleCustomers = response['totalElements'];
    },
    errors => console.log(errors));
  }

  loadMaleCustomers = () => {
    this.customersService
    .getCustomersByGender('M')
    .subscribe(response => {
      this.totalMaleCustomers = response['totalElements'];
    },
    errors => console.log(errors));
  }

  loadAllPurchases = () => {
    this.purchasesService
      .getPurchases(1)
      .subscribe(response => this.totalPurchases = response['totalElements']);
  }

  loadFemalePurchases = () => {
    this.purchasesService
      .getPurchasesByGender('F', 1)
      .subscribe(response => this.totalFemalePurchases = response['totalElements']);
  }

  loadMalePurchases = () => {
    this.purchasesService
      .getPurchasesByGender('M', 1)
      .subscribe(response => this.totalMalePurchases = response['totalElements']);
  }

  prepare = (customer) => {
    this.purchasesService.purchase.customer = customer;
  }

  prevPage = () => {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.loadAllCustomers();
    }
  }

  nextPage = () => {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadAllCustomers();
    }
  }

}
