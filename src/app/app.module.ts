import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { CurrencyMaskModule } from "ng2-currency-mask";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './auth/auth-guard.service';
import { MenuComponent } from './components/menu/menu.component';
import { CustomersComponent } from './components/customers/customers.component';
import { PurchasesComponent } from './components/purchases/purchases.component';
import { CustomerFormComponent } from './components/customers/customer-form/customer-form.component';
import { CustomerListComponent } from './components/customers/customer-list/customer-list.component';
import { PurchaseFormComponent } from './components/purchases/purchase-form/purchase-form.component';
import { PurchaseListComponent } from './components/purchases/purchase-list/purchase-list.component';
import { CustomerDetailsComponent } from './components/customers/customer-details/customer-details.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MenuComponent,
    CustomersComponent,
    PurchasesComponent,
    CustomerFormComponent,
    CustomerListComponent,
    PurchaseFormComponent,
    PurchaseListComponent,
    CustomerDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    CurrencyMaskModule
  ],
  providers: [AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
