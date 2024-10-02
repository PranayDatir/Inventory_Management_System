import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { BrandsComponent } from './component/brands/brands.component';
import { ProductsComponent } from './component/products/products.component';
import { BrandFormComponent } from './component/brand-form/brand-form.component';
import { ProductsFormComponent } from './component/products-form/products-form.component';
import { OrderComponent } from './component/order/order.component';
import { OrderFormComponent } from './component/order-form/order-form.component';

const routes: Routes = [
  {
    path: "", redirectTo: "home", pathMatch: "full"
  },
  {
    path: "home", component: HomeComponent
  },
  {
    path: "brand", component: BrandsComponent
  },
  {
    path:"brand/:id", component:BrandFormComponent
  },
  {
    path: "brandForm", component: BrandFormComponent 
  },
  {
    path: "products", component: ProductsComponent
  },
  {
    path: "productForm", component: ProductsFormComponent
  },
  {
    path: "products/:id", component: ProductsFormComponent
  },
  {
    path: "orders", component: OrderComponent
  },
  {
    path: "orderForm", component: OrderFormComponent
  },
  {
    path: "orders/:id", component: OrderFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
