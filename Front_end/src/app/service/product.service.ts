import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../model/products';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get(environment.apiUrl+"/product");
  }

  saveProducts(product: Products) {
    return this.http.post(environment.apiUrl + "/product", product);
  }

  getSingleProduct(id: number) {
    return this.http.get(environment.apiUrl + '/product/' + id);
  }

  updateProduct(id: any, product: Products) {
    return this.http.put(environment.apiUrl + '/product/' + id, product)
  }

  deleteProduct(id : string){
    return this.http.delete(environment.apiUrl + '/product/' + id)
  }
}
