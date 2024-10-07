import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrdersService } from '../../service/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../service/product.service';
import { Products } from '../../model/products';
import { Orders } from '../../model/orders';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent{

  // orderForm: FormGroup;
  // products: Products[] = [];
  // order:any;
  // disableValue : boolean = false;

  // constructor(private fb: FormBuilder, private orderService: OrdersService, private router: Router, private productService: ProductService, private activatedRoute: ActivatedRoute) { }


  // ngOnInit(): void {
  //   this.disableValue = true;

  //   this.productService.getProducts().subscribe((res: Products[]) => {
  //     this.products = res;
  //   });

  //   this.orderForm = this.fb.group({
  //     orderNo: ['', [Validators.required]],
  //     productId: ['', [Validators.required]],
  //     quantity: [null, [Validators.required]],
  //     salePrice: [null, [Validators.required]],
  //     discount: [null, [Validators.required]],
  //     totalAmount: [null, [Validators.required]]
  //   });

  //   this.orderForm.controls['salePrice'].disable();
  //   this.orderForm.controls['totalAmount'].disable();

  //   this.updateTotalAmount();

  //   this.getEditData();
    
  // }

  // addOrder() {
  //   if (this.orderForm.invalid) {
  //     alert("Please Provide All Details...")
  //     return;
  //   }
  //   console.log(this.orderForm.value);
  //   let formValues = this.orderForm.getRawValue() as Orders;
  //   if (formValues.quantity > this.selectedProduct.availabelQuantity) {
  //     alert("Only " + this.selectedProduct.availabelQuantity + " quantity is left in inventory");
  //     return;
  //   }
  //   this.orderService.addOrder(formValues).subscribe(() => {
  //     this.selectedProduct.availabelQuantity -= formValues.quantity;
  //     this.productService.updateProduct(this.selectedProduct.productId, this.selectedProduct).subscribe();
  //     alert("Your order is added Successfully....");
  //     this.router.navigateByUrl('/orders');
  //   });
  // }


  // // updateOrder() {
  // //   if (this.orderForm.invalid) {
  // //     alert("Please Provide All Details...")
  // //     return;
  // //   }

  // //   let formValues = this.orderForm.getRawValue() as Orders;

  // //   if (formValues.quantity > this.selectedProduct.availabelQuantity) {
  // //     alert("Only " + this.selectedProduct?.availabelQuantity + " quantity is left in inventory");
  // //     return;
  // //   }

  // //   console.log(formValues);

  // //   this.orderService.updateProduct(this.order.id, formValues).subscribe(() => {
  // //     this.selectedProduct.availabelQuantity -= formValues.quantity;
  // //     this.productService.updateProduct(this.selectedProduct.id, this.selectedProduct).subscribe();
  // //     alert("Your order is updated Successfully....");
  // //     this.router.navigateByUrl('/orders');
  // //   });
  // // }

  // updateTotalAmount() {
  //   this.orderForm.valueChanges.subscribe(() => {
  //     this.orderForm.controls['totalAmount'].enable({ emitEvent: false });
  //     if (this.orderForm.value.productId && this.orderForm.value.quantity) {
  //       let total = this.selectedProduct.salePrice * this.orderForm.value.quantity - (this.orderForm.value.discount || 0);
  //       this.orderForm.controls['totalAmount'].setValue(total, { emitEvent: false })
  //     }
  //     this.orderForm.controls['totalAmount'].disable({ emitEvent: false });
  //   });
  // }

  // selectedProduct?: Products;

  // productSelected(productId: any) {
  //   console.log(productId);
  //   this.selectedProduct = this.products.find((x) => x.productId == productId);
  //   this.orderForm.controls['salePrice'].enable();
  //   this.orderForm.controls['salePrice'].setValue(
  //     this.selectedProduct.salePrice
  //   );
  //   this.orderForm.controls['salePrice'].disable();
  // }

  // getEditData(){
  // let id = this.activatedRoute.snapshot.params['id'];
  //   if (id != null) {
  //     this.orderService.getSingleOrder(id).subscribe((res) => {
  //       this.order= res;
  //       console.log(this.order)
  //         this.orderForm.patchValue(this.order);
  //     })
  //   }
  // }
}
