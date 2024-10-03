package com.ims.main.imsController;
import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
		Product data = imsproductservice.saveProduct(product);
		Response response = new Response();
		response.setData(data);
		response.setMessage("Success");
		response.setError(false);

		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/product")
	public ResponseEntity<Response> getAllProducts(){
		List<Product> data = imsproductservice.getAllProducts();
		Response response = new Response();
		response.setData(data);
		response.setMessage("Success");
		response.setError(false);
		return ResponseEntity.ok(response);
	}
	
	@GetMapping("/product/id")
	public ResponseEntity<Response> getSingleProduct(@PathVariable int id){
		Optional<Product> data = imsproductservice.getProduct(id) ; 
		Response response = new Response();
		response.setData(data);
		response.setMessage("Success");
		response.setError(false);
		return ResponseEntity.ok(response);
	}
	
}
