import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../service/brand.service';
import { Brand } from '../../model/brand';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../model/products';
import { ToasterService } from '../../service/toaster.service';
import { ApiResponse } from '../../Shared/ApiResponse';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent implements OnInit {

  brandservice = inject(BrandService);
  toastr = inject(ToasterService);
  productService = inject(ProductService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  fb = inject(FormBuilder);

  productForm: FormGroup;
  brands: Brand[];
  product: Products;
  
  ngOnInit(): void {
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      productDetails: [''],
      brandName: ['', [Validators.required]],
      purchasePrice: ['', [Validators.required]],
      salePrice: ['', [Validators.required]],
      availabelQuantity: ['', [Validators.required]]
    });

    // this.brandservice.getBrand().subscribe((result: any) => (this.brands = result))
    this.getAllBrands();
    let id: number = this.activeRoute.snapshot.params['id'];
    console.log(id);

    if (id) {
      this.getSingleProduct(id);
    }
    
  }

  getSingleProduct(id: number){
    this.productService.getSingleProduct(id).subscribe({
      next: (response: ApiResponse<Products>)=>{
        this.product = response.data;
        console.log(this.product);
        this.productForm.patchValue(this.product);
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

  //Add Products
  onSubmit() {
    console.log(this.productForm.value);
    if (this.productForm.invalid) {
      this.toastr.showNotification("Please provide all details....",'Okay');
      return;
    }
    this.productService.saveProducts(this.productForm.value).subscribe({
      next: (response: ApiResponse<Products>)=>{
        this.toastr.showNotification(response.message,'Okay');
        this.router.navigateByUrl("/products");
      },
      error: ()=>{

      },
      complete: ()=>{

      }
    })
  }

  //Update Product 
  updateProduct() {
    if (this.productForm.invalid) {
      this.toastr.showNotification("Please provide all details....",'Okay');
      return;
    }
    this.productService.updateProduct(this.product.productId, this.productForm.value)
    .subscribe({
      next: (response: ApiResponse<Products>) => {
        this.toastr.showNotification(response.message,'Okay');
        this.router.navigateByUrl("/products");
      },
      error: ()=>{

      },
      complete: ()=>{

      }
    });
  }
}
