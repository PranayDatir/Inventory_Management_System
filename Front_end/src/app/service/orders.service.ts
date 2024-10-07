import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Orders } from '../model/orders';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  getOrders() {
    return this.http.get(environment.apiUrl + "/order");
  }

  addOrder(order: Orders) {
    return this.http.post(environment.apiUrl + '/order', order);
  }

  getSingleOrder(id: string) {
    return this.http.get(environment.apiUrl + '/order/' + id);
  }

  updateProduct(id: number, order: Orders) {
    return this.http.put(environment.apiUrl + '/order/' + id, order)
  }

  deleteOrder(id: number) {
    return this.http.delete(environment.apiUrl + '/order/' + id);
  }
}
