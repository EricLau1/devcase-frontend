import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../../../services/purchases/purchases.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-purchase-form',
  templateUrl: './purchase-form.component.html',
  styleUrls: ['./purchase-form.component.css']
})
export class PurchaseFormComponent implements OnInit {

  cashValue = 0.0;

  DEFAULT_VALUE = { customer: null, cashSpent: this.cashValue };

  constructor(private purchasesService: PurchasesService, 
    private toastr: ToastrManager) {
  }

  ngOnInit() {
  }

  clear = () => {
    this.cashValue = 0.0;
    this.purchasesService.purchase = this.DEFAULT_VALUE;
  }

  buy = () => {
    const { purchase } = this.purchasesService;
    if(purchase.customer != null) {

      if(this.cashValue > 1) {
        purchase.cashSpent = this.cashValue;
        this.purchasesService
          .postPurchase(purchase.customer.id, purchase.cashSpent)
          .subscribe(response => {
            this.toastr.successToastr("Venda finalizada com sucesso!", `Pontos: ${response['points']}`);
            this.purchasesService.isPurchased = true;
            this.clear();
            return;
          },
          errors => console.log(errors));
      } else {
        this.toastr.warningToastr('Mínimo R$: 1,00 ', 'Aviso');
      }

    } else {
      this.toastr.warningToastr('Selecione um cliente', 'Aviso');
    }
  }

  removePrepare = () => {
    this.purchasesService.purchase.customer = null;
  }
}
