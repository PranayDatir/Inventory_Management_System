package com.ims.main.imsController;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ims.main.imsServicei.ImsOrdersServicei;
import com.ims.main.model.Order;
import com.ims.main.model.Response;

@CrossOrigin
@RestController
public class ImsOrdersController {
	
	@Autowired
	ImsOrdersServicei imsOrderService;
	
	@Autowired
	ImsProductsController imsProductController;
	
	@PostMapping("/order")
	public ResponseEntity<Response> addOrder(@RequestBody Order order){
		try {
			Order data = imsOrderService.saveOrder(order);
			return ResponseEntity.status(200).body(new Response("Order placed successfully.", false, null));
		}catch (Exception e) {
			return ResponseEntity.status(500).body(new Response(e.getMessage(), true, null));
		}
	}
	
	@GetMapping("/order")
	public ResponseEntity<Response> getOrders() {
		try {
			List<Order> data = imsOrderService.fetchAllOrders();
			return ResponseEntity.status(200).body(new Response("Success.", false, data));
		}catch (Exception e) {
			// TODO: handle exception
			return ResponseEntity.status(500).body(new Response(e.getMessage(), true, null));
		}
	}
	
	@GetMapping("/order/{id}")
	public ResponseEntity<Response> getSingleOrder(@PathVariable int id) {
		try {
			Optional<Order> data = imsOrderService.fetchOrder(id);
			if(data.isEmpty()) {
				return ResponseEntity.status(200).body(new Response("Order not found", true, null));
			}
			return ResponseEntity.status(200).body(new Response("Success.", false, data));
		}catch (Exception e) {
			return ResponseEntity.status(500).body(new Response(e.getMessage(), true, null));
		}
	}
	
	@PutMapping("/order/{id}")
	public ResponseEntity<Response> updateOrder(@PathVariable int id, @RequestBody Order order) {
	try{
		Optional<Order> orderData = imsOrderService.fetchOrder(id);
		if(orderData.isEmpty()) {
			return ResponseEntity.status(200).body(new Response("Order not found", true, null));
		}
		
		Order existingOrder = orderData.get();
		existingOrder.setOrderNo(order.getOrderNo());
		existingOrder.setQuantity(order.getQuantity());
		existingOrder.setSalePrice(order.getSalePrice());
		existingOrder.setDiscount(order.getDiscount());
		existingOrder.setTotalAmount(order.getTotalAmount());
		
		return ResponseEntity.status(200).body(new Response("Order Updated Successfully.", false, existingOrder));
		
	}catch (Exception e) {
		return ResponseEntity.status(500).body(new Response(e.getMessage(), true, null));
	}
	}
	
	@DeleteMapping("/order/{id}")
	public ResponseEntity<Response> deleteOrder(@PathVariable int id){
		try {
			Optional<Order> orderData = imsOrderService.fetchOrder(id);
			if(orderData.isEmpty()) {
				return ResponseEntity.status(200).body(new Response("Order not found", true, null));
			}
			imsOrderService.deleteOrder(id);
			return ResponseEntity.status(200).body(new Response("Order deleted successfully.", false, null));
		}catch (Exception e) {
			return ResponseEntity.status(500).body(new Response(e.getMessage(), true, null));
		}	
	}
}
