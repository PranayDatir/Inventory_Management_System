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
    return this.http.get<Products[]>("http://localhost:3000/products");
  }

  saveProducts(product: Products) {
    return this.http.post<Products>(environment.apiUrl + "/products", product);
  }

  getSingleProduct(id: string) {
    return this.http.get<Products>(environment.apiUrl + '/products/' + id);
  }

  updateProduct(id: any, product: Products) {
    return this.http.put<Products>(environment.apiUrl + '/products/' + id, product)
  }

  deleteProduct(id : string){
    return this.http.delete<Products>(environment.apiUrl + '/products/' + id)
  }
}
