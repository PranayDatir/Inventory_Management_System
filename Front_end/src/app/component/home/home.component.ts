import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../service/brand.service';
import { Brand } from '../../model/brand';
import { OrdersService } from '../../service/orders.service';
import { ProductService } from '../../service/product.service';
import { ApiResponse } from '../../Shared/ApiResponse';
import { OrderFormComponent } from '../order-form/order-form.component';
import { Orders } from '../../model/orders';
import { Products } from '../../model/products';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private brand: BrandService, private order: OrdersService, private product:ProductService) { }
  totalOrders: number ;
  totalProducts: number;
  totalBrands: number;

  ngOnInit() {
    this.brand.getBrand().subscribe((response:ApiResponse<Brand[]>) => (this.totalBrands = response.data.length));
    this.order.getOrders().subscribe((response:ApiResponse<Orders[]>)=> (this.totalOrders = response.data.length));
    this.product.getProducts().subscribe((response:ApiResponse<Products[]>)=>(this.totalProducts = response.data.length))
  }
}
