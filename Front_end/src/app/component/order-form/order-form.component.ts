import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../../service/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Products } from '../../model/products';
import { Orders } from '../../model/orders';
import { ApiResponse } from '../../Shared/ApiResponse';
import { ToasterService } from '../../service/toaster.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit{

  orderForm: FormGroup;
  products: Products[] = [];
  order:Orders;
  disableValue : boolean = false;
  toastr = inject(ToasterService);

  constructor(private fb: FormBuilder, private orderService: OrdersService, private router: Router, private productService: ProductService, private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.disableValue = true;

    this.productService.getProducts().subscribe({
      next: (response:ApiResponse<Products[]>) => {
        this.products = response.data;
      },
      error: ()=>{

      },
      complete: ()=>{

      }
    });

    this.orderForm = this.fb.group({
      orderNo: ['', [Validators.required]],
      productName: ['', [Validators.required]],
      quantity: [null, [Validators.required]],
      salePrice: [null, [Validators.required]],
      discount: [null, [Validators.required]],
      totalAmount: [null, [Validators.required]]
    });

    this.orderForm.controls['salePrice'].disable();
    this.orderForm.controls['totalAmount'].disable();

    this.updateTotalAmount();

    this.getEditData();
    
  }

  addOrder() {
    if (this.orderForm.invalid) {
      alert("Please Provide All Details...")
      return;
    }
    console.log(this.orderForm.value);
    let formValues = this.orderForm.getRawValue() as Orders;
    if (formValues.quantity > this.selectedProduct.availabelQuantity) {
      alert("Only " + this.selectedProduct.availabelQuantity + " quantity is left in inventory");
      return;
    }
    this.orderService.addOrder(formValues).subscribe({
      next: () => {
        this.selectedProduct.availabelQuantity -= formValues.quantity;
        this.productService.updateProduct(this.selectedProduct.productName, this.selectedProduct).subscribe();
        alert("Your order is added Successfully....");
        this.router.navigateByUrl('/orders');
      }
    });
  }


  updateOrder() {
    if (this.orderForm.invalid) {
      alert("Please Provide All Details...")
      return;
    }

    let formValues = this.orderForm.getRawValue() as Orders;

    if (formValues.quantity > this.selectedProduct.availabelQuantity) {
      alert("Only " + this.selectedProduct?.availabelQuantity + " quantity is left in inventory");
      return;
    }

    console.log(formValues);

    this.orderService.updateProduct(this.order.orderId, formValues).subscribe(() => {
      this.selectedProduct.availabelQuantity -= formValues.quantity;
      this.productService.updateProduct(this.selectedProduct.productId, this.selectedProduct).subscribe();
      alert("Your order is updated Successfully....");
      this.router.navigateByUrl('/orders');
    });
  }

  updateTotalAmount() {
    this.orderForm.valueChanges.subscribe(() => {
      this.orderForm.controls['totalAmount'].enable({ emitEvent: false });
      if (this.orderForm.value.productName && this.orderForm.value.quantity) {
        let total = this.selectedProduct.salePrice * this.orderForm.value.quantity - (this.orderForm.value.discount || 0);
        this.orderForm.controls['totalAmount'].setValue(total, { emitEvent: false })
      }
      this.orderForm.controls['totalAmount'].disable({ emitEvent: false });
    });
  }

  selectedProduct?: Products;

  productSelected(productName: string) {
    console.log(productName);
    this.selectedProduct = this.products.find((x) => x.productName == productName);
    this.orderForm.controls['salePrice'].enable();
    this.orderForm.controls['salePrice'].setValue(
      this.selectedProduct.salePrice
    );
    this.orderForm.controls['salePrice'].disable();
  }

  getEditData(){
  let id = this.activatedRoute.snapshot.params['id'];
    if (id != null) {
      this.orderService.getSingleOrder(id).subscribe((response: ApiResponse<Orders>) => {
        this.order= response.data;
        console.log(this.order)
          this.orderForm.patchValue(this.order);
      })
    }
  }
}
