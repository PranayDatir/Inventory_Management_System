import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Brand } from '../../model/brand';
import { BrandService } from '../../service/brand.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css'
})
export class BrandsComponent implements OnInit{
  constructor(private brand:BrandService){}
  dataSource: MatTableDataSource<Brand, MatPaginator>;
  displayedColumns : string[] = ['name','action'];

  @ViewChild(MatPaginator) pagination:MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  product:any;

  ngOnInit():void {
    this.brand.getBrand().subscribe((result :any )=> this.initTable(result));
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

  deleteData(id: string){
    this.brand.deleteBrand(id).subscribe(()=>{
      alert("Brand deleted Successfully........");
    });
    window.location.reload();
  }
}
