import { Component, OnInit } from '@angular/core';
import { BrandService } from '../../service/brand.service';
import { Brand } from '../../model/brand';
import { OrdersService } from '../../service/orders.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor(private brand: BrandService, private order: OrdersService, private product:ProductService) { }
  totalOrders: number ;
  totalProducts: number ;
  totalBrands: number;

  ngOnInit() {
    this.brand.getBrand().subscribe((result:any) => (this.totalBrands = result.length));
    this.order.getOrders().subscribe((result:any)=> (this.totalOrders = result.length));
    this.product.getProducts().subscribe((result:any)=>(this.totalProducts = result.length))
  }
}
