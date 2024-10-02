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
    return this.http.get<Orders[]>(environment.apiUrl + "/orders");
  }

  addOrder(order: Orders) {
    return this.http.post<Orders>(environment.apiUrl + '/orders', order);
  }

  getSingleOrder(id: string) {
    return this.http.get(environment.apiUrl + '/orders/' + id);
  }

  updateProduct(id: string, order: Orders) {
    return this.http.put<Orders>(environment.apiUrl + '/orders/' + id, order)
  }

  deleteOrder(id: string) {
    return this.http.delete(environment.apiUrl + '/orders/' + id);
  }
}
