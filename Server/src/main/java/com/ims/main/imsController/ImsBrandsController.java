package com.ims.main.imsController;

import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.ims.main.imsServicei.ImsBrandServicei;
import com.ims.main.model.Brand;
import com.ims.main.model.Response;

import jakarta.validation.Valid;

@CrossOrigin
@RestController
public class ImsBrandsController {

	@Autowired
	ImsBrandServicei imsBrandService;

	@PostMapping("/brands")
	public ResponseEntity<Response> saveBrand(@RequestBody Brand brand) {
		Brand data = imsBrandService.saveBrand(brand);
		Response response = new Response();
		response.setData(data);
		response.setMessage("Success");
		response.setError(false);

		return ResponseEntity.ok(response);
	}

	@GetMapping("/brands")
	public ResponseEntity<Response> getBrands() {
		List<Brand> data = imsBrandService.getAllBrands();
		Response response = new Response();
		response.setData(data);
		response.setMessage("Success");
		response.setError(false);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/brands/{id}")
	public ResponseEntity<Response> getSingleBrands(@PathVariable int id) {
		Optional<Brand> data = imsBrandService.getSingleBrand(id);
		Response response = new Response();
		response.setData(data);
		response.setMessage("Success");
		response.setError(false);
		return ResponseEntity.ok(response);
	}

	@PutMapping("/brands/{id}")
	public ResponseEntity<Response> updateBrands(@RequestBody Brand brand, @PathVariable int id) {

		if (brand.getBrandId() == id) {
			Brand data = imsBrandService.saveBrand(brand);
			Response response = new Response();
			response.setData(data);
			response.setMessage("Success.");
			response.setError(false);
			return ResponseEntity.ok(response);
		} else {
			Response response = new Response();
			response.setMessage("Brand Id is not Found.");
			response.setError(true);
			return ResponseEntity.ok(response);
		}
	}

	@DeleteMapping("/brands/{id}")
	public ResponseEntity<Response> deleteBrands(@PathVariable int id) {

		imsBrandService.deleteBrand(id);
		Response response = new Response();
		response.setMessage("Brand Id is not Found.");
		response.setError(false);
		return ResponseEntity.ok(response);
	}
}
