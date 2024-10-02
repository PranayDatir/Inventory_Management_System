import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BrandService } from '../../service/brand.service';
import { Brand } from '../../model/brand';
import { ProductService } from '../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from '../../model/products';

@Component({
  selector: 'app-products-form',
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private brandService: BrandService, private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) { }

  productForm: FormGroup;
  brands: Brand[];
  product: Products;
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      details: [''],
      brandId: ['', [Validators.required]],
      purchasePrice: ['', [Validators.required]],
      salePrice: ['', [Validators.required]],
      availabelQuantity: ['', [Validators.required]]
    });

    this.brandService.getBrand().subscribe((result: any) => (this.brands = result))
    
    let id = this.activatedRoute.snapshot.params['id'];
    console.log(id);

    if (id) {
      this.productService.getSingleProduct(id).subscribe((result) => {
        this.product = result;
        this.productForm.patchValue(this.product);
      })
    }
    
  }

  //Add Products
  onSubmit() {
    console.log(this.productForm.value);
    if (this.productForm.invalid) {
      alert("Please provide all details....");
      return;
    }
    this.productService.saveProducts(this.productForm.value).subscribe(() => {
      alert("Your Product is Added Successfully....");
      this.router.navigateByUrl("/products");
    })
  }

  //Update Product 
  updateProduct() {
    if (this.productForm.invalid) {
      alert("Please provide all details....");
      return;
    }
    this.productService.updateProduct(this.product.id, this.productForm.value).subscribe(() => {
      alert("Your Product is Updated Successfully....");
      this.router.navigateByUrl("/products");
    })
  }
}
