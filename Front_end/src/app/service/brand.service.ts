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
    return this.http.get<Brand>(environment.apiUrl+"/brands");
  }

  addBrand(brand: Brand) {
    return this.http.post<Brand>(environment.apiUrl+"/brands",brand);
  }

  getSingleBrand(brandId: string) {
    return this.http.get<Brand>(environment.apiUrl+"/brands/"+brandId);
  }

  updateBrand(brand:Brand){
   return this.http.put<Brand>(environment.apiUrl+'/brands/'+brand.id,brand)
  }

  deleteBrand(brandId: string){
    return this.http.delete<Brand>(environment.apiUrl+'/brands/'+brandId);
  }
}
