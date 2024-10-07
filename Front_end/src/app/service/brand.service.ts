import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand } from '../model/brand';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private http: HttpClient) { }

  getBrand() {
    return this.http.get(environment.apiUrl+"/brands");
  }

  addBrand(brand: Brand) {
    return this.http.post(environment.apiUrl+"/brands",brand);
  }

  getSingleBrand(brandId: number) {
    return this.http.get(environment.apiUrl+"/brands/"+brandId);
  }

  updateBrand(brand:Brand){
   return this.http.put(environment.apiUrl+'/brands/'+brand.brandId,brand)
  }

  deleteBrand(brandId: number){
    return this.http.delete(environment.apiUrl+'/brands/'+brandId);
  }
}
