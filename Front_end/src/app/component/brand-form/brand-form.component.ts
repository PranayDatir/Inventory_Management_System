import { Component, OnInit } from '@angular/core';
import { Brand } from '../../model/brand';
import { BrandService } from '../../service/brand.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-brand-form',
  templateUrl: './brand-form.component.html',
  styleUrl: './brand-form.component.css'
})
export class BrandFormComponent implements OnInit{
  constructor(private brandService : BrandService,private router:Router, private activeRoute: ActivatedRoute){}
  brand:Brand;
  brandName:string;
  
  ngOnInit(): void {  
   const brandId = this.activeRoute.snapshot.params['id'];
   console.log(brandId);
   
   if(brandId){
    this.brandService.getSingleBrand(brandId).subscribe((result) => {
      console.log("RESULT",result);
      this.brand = result;
      this.brandName = result.brandName;
      
    })
   }
  }
 
  addBrand(){
    console.log(this.brandName);
    if(!this.brandName){
      alert("Please enter brand name")
      return;
    }
    let brand : Brand={
      brandName: this.brandName
    }
    this.brandService.addBrand(brand).subscribe(result=>{
      alert("Brand added Successfully");
      this.router.navigateByUrl("/brand");
    })
  }
  updateBrand(){
    console.log(this.brandName);
    if(!this.brandName){
      alert("Please enter brand name")
      return;
    }
    let brand : Brand={
      brandId:this.brand.brandId,
      brandName: this.brandName
    }
    this.brandService.updateBrand(brand).subscribe(result =>{
      alert("Brand updated Successfully");
      this.router.navigateByUrl("/brand");
    })
  }
}