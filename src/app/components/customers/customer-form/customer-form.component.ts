import { Component, OnInit } from '@angular/core';

import { ToastrManager } from 'ng6-toastr-notifications';
import { FormGroup } from '@angular/forms';
import { CustomersService } from '../../../services/customers/customers.service';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  genders = [
    {
      value: 'M',
      text: 'Masculino'
    },
    {
      value: 'F',
      text: 'Feminino'
    }
  ];

  DEFAULT_VALUES = { id: 0, firstName: '', lastName: '', phone: '', cpf: '', rg: '', address: '', email: '', gender: '' };

  constructor(private customersService: CustomersService, private toastr: ToastrManager) { }

  ngOnInit() {
  
  }

  save = (form?: FormGroup) => {
    console.log(form.value);
    if(form.valid) {
      if(form.value.id == 0) {
        this.customersService
          .postCustomer(form.value)
          .subscribe(response => {
            this.customersService.loadCustomers();
            this.toastr.successToastr('Novo cliente adicionado!', 'Cadastro');
            this.customersService.createdCustomer = true;
            this.clear();
            return;
          });
      } else {
        this.customersService
          .putCustomer(form.value)
          .subscribe(response => {
            this.customersService.loadCustomers();
            this.toastr.infoToastr('Cliente atualizado com sucesso!', 'Atualização');
            this.clear();
            return;
          }, errors => this.toastr.errorToastr(errors.message, 'ERRO'));
      }
    } else {
      this.toastr.warningToastr('Formulário inválido', 'Aviso');
    }
  }
  
  clear = () => {
    this.customersService.model = this.DEFAULT_VALUES;
  }
}
