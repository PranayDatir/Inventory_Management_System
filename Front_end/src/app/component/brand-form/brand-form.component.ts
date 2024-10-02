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
  ngOnInit(): void {  
   const id = this.activeRoute.snapshot.params['id'];
   console.log(id);
   
   if(id){
    this.brandService.getSingleBrand(id).subscribe((result) => {
      this.brand = result;
      this.bname = result.bname;
    })
   }
  }
  bname:string;
  addBrand(){
    console.log(this.bname);
    if(!this.bname){
      alert("Please enter brand name")
      return;
    }
    let brand : Brand={
      bname: this.bname
    }
    this.brandService.addBrand(brand).subscribe(result=>{
      alert("Brand added Successfully");
      this.router.navigateByUrl("/brand");
    })
  }
  updateBrand(){
    console.log(this.bname);
    if(!this.bname){
      alert("Please enter brand name")
      return;
    }
    let brand : Brand={
      id:this.brand.id,
      bname: this.bname
    }
    this.brandService.updateBrand(brand).subscribe(result =>{
      alert("Brand updated Successfully");
      this.router.navigateByUrl("/brand");
    })
  }
}