package com.ims.main.imsController;
import java.util.*;
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

import com.ims.main.imsServicei.ImsProductsServicei;
import com.ims.main.model.Brand;
import com.ims.main.model.Product;
import com.ims.main.model.Response;

@CrossOrigin
@RestController
public class ImsProductsController {
	
	@Autowired
	ImsProductsServicei imsproductservice;
	
	@PostMapping("/product")
	public ResponseEntity<Response> saveBrand(@RequestBody Product product ) {
		try {
			
			if(product.getProductName().isEmpty()) {
				Response response = new Response("Product name is required.", true, null);
				return ResponseEntity.status(200).body(response);
			}
			
			if(product.getProductDetails().isEmpty()) {
				Response response = new Response("Product details is required.", true, null);
				return ResponseEntity.status(200).body(response);
			}
			
			if(product.getBrandName().isEmpty()) {
				Response response = new Response("Brand Name is required.", true, null);
				return ResponseEntity.status(200).body(response);
			}
			
			Product data = imsproductservice.saveProduct(product);
			Response response = new Response("Success.", false, data);
			return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(200).body(response);
		}

	}
	
	@GetMapping("/product")
	public ResponseEntity<Response> getAllProducts(){
			try {
				List<Product> data = imsproductservice.getAllProducts();
				Response response = new Response("Success.", false, data);
				return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(500).body(response);
		}
	}
	
	@GetMapping("/product/{id}")
	public ResponseEntity<Response> getSingleProduct(@PathVariable int id){
		try {
			Optional<Product> data = imsproductservice.getProduct(id);
			if(data.isEmpty()) {
				Response response = new Response("Product Not Found", true, null);
				return ResponseEntity.status(404).body(response);
			}
				Response response = new Response("Success", false, data);
				return ResponseEntity.status(200).body(response);
		}catch (Exception e) {
			System.out.println("HO");
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(500).body(response);
		}
	}
	
	@PutMapping("/product/{id}")
	public ResponseEntity<Response> updateProduct(@RequestBody Product product, @PathVariable int id){
		try {
			Optional<Product> productData = imsproductservice.getProduct(id);
			System.out.println(productData);
			if(!productData.isPresent()) {
				Response response = new Response("Product Not Found", true, null);
				return ResponseEntity.status(404).body(response);
			}
			
			if(product.getProductName().isEmpty()) {
				Response response = new Response("Product name is required.", true, null);
				return ResponseEntity.status(200).body(response);
			}
			
			if(product.getProductDetails().isEmpty()) {
				Response response = new Response("Product details is required.", true, null);
				return ResponseEntity.status(200).body(response);
			}
			
			if(product.getBrandName().isEmpty()) {
				Response response = new Response("Brand Name is required.", true, null);
				return ResponseEntity.status(200).body(response);
			}
			
			Product existingProduct = productData.get();
			existingProduct.setProductName(product.getProductName());
			existingProduct.setProductDetails(product.getProductDetails());
			existingProduct.setPurchasePrice(product.getPurchasePrice());
			existingProduct.setSalePrice(product.getSalePrice());
			existingProduct.setAvailabelQuantity(product.getAvailabelQuantity());
			existingProduct.setBrandName(product.getBrandName());
			
			
			Product data1 = imsproductservice.saveProduct(existingProduct);
			Response response = new Response("Success.", false, data1);
			return ResponseEntity.status(200).body(response);
			
			
		}catch (Exception e) {
			// TODO: handle exception
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(500).body(response);
		}
	}
	
	@DeleteMapping("/product/{id}")
	public ResponseEntity<Response> deleteProduct(@PathVariable int id){
		try {
			Optional<Product> productData = imsproductservice.getProduct(id);
			if(!productData.isPresent()) {
				Response response = new Response("Product Not Found", true, null);
				return ResponseEntity.status(404).body(response);
			}
			imsproductservice.deleteProduct(id);
			Response response = new Response("Product Deleted Successfully", false, null);
			return ResponseEntity.status(200).body(response);			
		}catch (Exception e) {
			// TODO: handle exception
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(500).body(response);
		}
		
	}
}
