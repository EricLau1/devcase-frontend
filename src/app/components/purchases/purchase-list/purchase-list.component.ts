import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../../../services/purchases/purchases.service';

@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  purchases: Array<any> = [];

  currentPage = 1;
  totalPages = 0;

  constructor(private purchasesService: PurchasesService) { }

  ngOnInit() {
    this.refresh();
  }

  refresh = () => {
    this.purchasesService
      .getPurchases(this.currentPage)
      .subscribe(response => {
        console.log(response);
        this.totalPages = response['totalPages'];
        this.purchases = response['content'];
      });
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
