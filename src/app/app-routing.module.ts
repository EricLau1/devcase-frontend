import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { CustomersComponent } from './components/customers/customers.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuardService],
    component: DashboardComponent
  },
  {
    path: 'clientes',
    canActivate: [AuthGuardService],
    component: CustomersComponent,
    children: [
      {
        path: 'clientes',
        canActivate: [AuthGuardService],
        component: CustomerFormComponent
      },
      {
        path: 'clientes',
        canActivate: [AuthGuardService],
        component: CustomerListComponent
      }
    ]
  },
  {
    path: 'compras',
    canActivate: [AuthGuardService],
    component: PurchasesComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
