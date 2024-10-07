import { Component, inject, OnInit } from '@angular/core';
import { Brand } from '../../model/brand';
import { BrandService } from '../../service/brand.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiResponse } from '../../Shared/ApiResponse';
import { ToasterService } from '../../service/toaster.service';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent implements OnInit{
   
  toastr = inject(ToasterService);
  brandService = inject(BrandService);
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  
  brand:Brand;
  brandName:string;
  
  ngOnInit(): void {  
   const brandId = this.activeRoute.snapshot.params['id'];
   console.log(brandId);
   
   if(brandId){
    this.brandService.getSingleBrand(brandId).subscribe({
      next: (response: ApiResponse<Brand>) => {
      console.log("RESULT",response);
      this.toastr.showNotification(response.message,'Okay');
      this.brand = response.data;
      this.brandName = response.data.brandName;
    },
    error: ()=>{

    },
    complete: ()=>{

    }
    });
   }
  }
 
  addBrand(){
    console.log(this.brandName);
    if(!this.brandName){
      this.toastr.showNotification("Please enter brand name",'Okay');
      return;
    }
    let brand : Brand={
      brandName: this.brandName
    }
    this.brandService.addBrand(brand).subscribe({
     next: (response: ApiResponse<Brand>)=>{
      this.toastr.showNotification(response.message,'Okay');
      this.router.navigateByUrl("/brand");
  }
  });
}

  updateBrand(){
    console.log(this.brandName);
    if(!this.brandName){
      this.toastr.showNotification("Please enter brand name",'Okay');
      return;
    }
    let brand : Brand={
      brandId:this.brand.brandId,
      brandName: this.brandName
    }
    this.brandService.updateBrand(brand).subscribe({
      next: (response: ApiResponse<Brand>)=>{
        console.log("RESPONSE-->",response.message);
        this.toastr.showNotification(response.message,'Okay');
        this.router.navigateByUrl("/brand");
      }
    })
  }
}

