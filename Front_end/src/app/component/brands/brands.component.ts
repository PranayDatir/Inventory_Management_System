import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from '../../model/brand';
import { BrandService } from '../../service/brand.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiResponse } from '../../Shared/ApiResponse';
import { ToasterService } from '../../service/toaster.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  brandservice = inject(BrandService);
  toastr = inject(ToasterService);
  
  dataSource: MatTableDataSource<Brand, MatPaginator>;
  displayedColumns : string[] = ['name','action'];

  @ViewChild(MatPaginator) pagination:MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit():void {
    this.getBrandData();
  }

  getBrandData(){
    this.brandservice.getBrand().subscribe({
      next: (response: ApiResponse<Brand[]>) => {
        this.toastr.showNotification(response.message,'Okay');
        this.initTable(response.data);
    },
    error: ()=>{

    },
    complete: ()=>{

    }
   });
  }

  initTable(data: Brand[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator=this.pagination;
    this.dataSource.sort=this.sort;
  }

  applyFilter(event:Event){
    const filterValue  = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  deleteData(id: number){
    this.brandservice.deleteBrand(id).subscribe({
      next: (response: ApiResponse<Brand>)=>{
        this.toastr.showNotification(response.message,'Okay');
       
      },
      complete: ()=>{
        this.getBrandData();
      }
    });
  
  }
}
