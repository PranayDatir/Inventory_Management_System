import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Orders } from '../../model/orders';
import { OrdersService } from '../../service/orders.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Products } from '../../model/products';
import { ApiResponse } from '../../Shared/ApiResponse';
import { ToasterService } from '../../service/toaster.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent implements OnInit {

  dataSource: MatTableDataSource<Orders, MatPaginator>;
  displayedColumns:string[]= ['orderNo', 'productName', 'quantity', 'salePrice', 'discount', 'totalAmount','action'];
  order: Orders[];
  product: Products[];
  constructor(private orderService: OrdersService) { }

  toastr = inject(ToasterService);
  @ViewChild(MatPaginator) pagination: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
   this.getOrders();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  getOrders(){
    this.orderService.getOrders().subscribe({
      next: (response: ApiResponse<Orders[]>) => {
        this.initTable(response.data)
      },
      error: ()=>{

      },
      complete: ()=>{

      }
    });
   }

  initTable(data: Orders[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.pagination;
    this.dataSource.sort = this.sort;
  }

  deleteOrder(id:number){
    this.orderService.deleteOrder(id).subscribe({
      next: (response: ApiResponse<Orders>)=>{
        this.toastr.showNotification(response.message,'Okay');
        this.getOrders();
      }
    });

  }
}
