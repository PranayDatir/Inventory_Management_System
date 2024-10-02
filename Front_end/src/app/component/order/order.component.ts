import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from '../../model/orders';
import { OrdersService } from '../../service/orders.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Products } from '../../model/products';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  dataSource: MatTableDataSource<Orders, MatPaginator>;
  displayedColumns:string[]= ['orderNo', 'productId', 'quantity', 'salePrice', 'discount', 'totalAmount','action'];
  order: Orders[];
  product: Products[];
  constructor(private orderService: OrdersService) { }

  @ViewChild(MatPaginator) pagination: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.orderService.getOrders().subscribe((result: Orders[]) => this.initTable(result));
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  initTable(data: Orders[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.pagination;
    this.dataSource.sort = this.sort;
  }

  deleteOrder(id:string){
    this.orderService.deleteOrder(id).subscribe();
    window.location.reload();
  }
}
