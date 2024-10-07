import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Products } from '../../model/products';
import { ProductService } from '../../service/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BrandService } from '../../service/brand.service';
import { Brand } from '../../model/brand';
import { ApiResponse } from '../../Shared/ApiResponse';
import { ToasterService } from '../../service/toaster.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {

  brandservice = inject(BrandService);
  toastr = inject(ToasterService);
  productService = inject(ProductService);
  products: Products;
  brands: Brand[];
  dataSource: MatTableDataSource<Products, MatPaginator>;
  displayedColumns: string[] = ['name', 'details', 'brandId', 'purchasePrice', 'salePrice', 'availabelQuantity', 'action'];

  @ViewChild(MatPaginator) pagination: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllBrands();
  }

  getAllProducts(){
    this.productService.getProducts().subscribe({
      next: (response: ApiResponse<Products[]>)=>{
        console.log(response.data);
        this.initTable(response.data);
      },
      error: ()=>{

      },
      complete: ()=>{

      }
    });
    }

    getAllBrands(){
      this.brandservice.getBrand().subscribe({
        next: (response: ApiResponse<Brand[]>)=>{
          this.brands = response.data;
        },
        error: ()=>{

        },
        complete: ()=>{

        }
      })
    }
  

  initTable(data: Products[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.pagination;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.paginator.firstPage();
  }

  deleteProduct(id : string){
    this.productService.deleteProduct(id).subscribe();
    window.location.reload();
  }
}
