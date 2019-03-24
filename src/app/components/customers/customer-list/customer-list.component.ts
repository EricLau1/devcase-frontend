import { Component, OnInit } from '@angular/core';
import { CustomersService } from '../../../services/customers/customers.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  
  selectedElement = null;
  
  currentPage = 1;
  totalPages = 0;

  constructor(private customersService: CustomersService) { }

  ngOnInit() {
    this.refresh();
  }
  onEdit = (customer) => {
    this.customersService.model = customer;
  }

  onDelete = (id) => {
    this.selectedElement = id;
  } 

  destroy = () => {
    if(this.selectedElement != null) {
      this.customersService
        .deleteCustomer(this.selectedElement)
        .subscribe(() => {
          this.customersService.customers = this.customersService.customers.filter(c => c.id != this.selectedElement);
          this.selectedElement = null;
          this.currentPage = 1;
          this.customersService.customerDetails = null;
          this.refresh();
        }, 
        errors => console.log(errors));
    }
  }

  refresh = () => {
    this.customersService
      .getCustomers(this.currentPage)
      .subscribe(response => {
        this.totalPages = response['totalPages'];
        this.customersService.customers = response['content'];
      });
  }

  onDetails = (customer) => {
    this.customersService.customerDetails = customer;
  } 

  prevPage = () => {
    if(this.currentPage > 1) {
      this.currentPage--;
      this.refresh();
    }
  }

  nextPage = () => {
    if(this.currentPage < this.totalPages) {
      this.currentPage++;
      this.refresh();
    }
  }
}
