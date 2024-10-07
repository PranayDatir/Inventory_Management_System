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
		try {
			if (brand.getBrandName().isEmpty()) {
				Response response = new Response("Brand name is required.", true, null);
				return ResponseEntity.status(200).body(response);
			}

			Brand data = imsBrandService.saveBrand(brand);
			Response response = new Response("Success", false, data);
			return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(200).body(response);
		}
	}

	@GetMapping("/brands")
	public ResponseEntity<Response> getBrands() {
		try {
			List<Brand> data = imsBrandService.getAllBrands();
			Response response = new Response("success", false, data);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(200).body(response);
		}
	}

	@GetMapping("/brands/{id}")
	public ResponseEntity<Response> getSingleBrands(@PathVariable int id) {
		try {
			Optional<Brand> data = imsBrandService.getSingleBrand(id);
			if (data.isEmpty()) {
				Response response = new Response("Brand not found.", true, data);
				return ResponseEntity.status(404).body(response);
			}
			Response response = new Response("Success", false, data);
			return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(500).body(response);
		}
	}

	@PutMapping("/brands/{id}")
	public ResponseEntity<Response> updateBrands(@RequestBody Brand brand, @PathVariable int id) {
		try {
			Optional<Brand> brandData = imsBrandService.getSingleBrand(id);

			if (!brandData.isPresent()) {
				Response response = new Response("Brand Not Found.", true, null);
				return ResponseEntity.status(404).body(response);
			}

			if (brand.getBrandName().isEmpty()) {
				Response response = new Response("Brand name is required.", true, null);
				return ResponseEntity.status(200).body(response);
			}

			Brand existingBrand = brandData.get();
			existingBrand.setBrandName(brand.getBrandName());

			Brand data = imsBrandService.saveBrand(existingBrand);
			Response response = new Response("Brand Update successfully.", false, data);
			return ResponseEntity.status(200).body(response);

		} catch (Exception e) {
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(500).body(response);
		}
	}

	@DeleteMapping("/brands/{id}")
	public ResponseEntity<Response> deleteBrands(@PathVariable int id) {

		try {
			
			Optional<Brand> brandData = imsBrandService.getSingleBrand(id);

			if (!brandData.isPresent()) {
				Response response = new Response("Brand Not Found.", true, null);
				return ResponseEntity.status(404).body(response);
			}
				imsBrandService.deleteBrand(id);
				Response response = new Response("Brand Deleted Successfully.", false, null);
				return ResponseEntity.status(200).body(response);
		} catch (Exception e) {
			Response response = new Response(e.getMessage(), true, null);
			return ResponseEntity.status(500).body(response);
		}
	}
}
