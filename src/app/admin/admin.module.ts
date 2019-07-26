import { SharedModule } from './../shared/shared.module';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminOrdersComponent } from 'app/admin/components/admin-orders/admin-orders.component';
import { AdminAuthGuard } from 'app/admin/services/admin-auth-guard.service';
import { ProductFormComponent } from 'app/admin/components/product-form/product-form.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule
  ],
  declarations: [
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
  ],
  providers: [
    AdminAuthGuard
  ]
})
export class AdminModule { }
