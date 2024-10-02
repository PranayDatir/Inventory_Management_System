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

	@PostMapping("/saveBrands")
	public ResponseEntity<Brand> saveBrand(@Valid @RequestBody Brand brand) {
		
//		Brand data = imsBrandService.saveBrand(brand);
//			Response response = new Response("Success.", false, data);
			return new ResponseEntity<>(imsBrandService.saveBrand(brand), HttpStatus.CREATED);
		
	}
 
	@GetMapping("/getAllBrands")
	public List<Brand> getBrands() {
		List<Brand> brandList = imsBrandService.getAllBrands();
		return brandList;
	}

	@GetMapping("/getSingleBrand/{id}")
	public Optional<Brand> getSingleBrands(@PathVariable int id) {
		Optional<Brand> b = imsBrandService.getSingleBrand(id);
		return b;
	}

//	@PutMapping("/updateBrand/{id}")
//	public Brand updateBrands(@RequestBody Brand b, @PathVariable int id) {
//
//		if (b.getbr() == id) {
//			imsService.saveBrand(b);
//			return b;
//		} else {
//			return null;
//		}
//	}
//
//	@DeleteMapping("/deleteBrand/{id}")
//	public void deleteBrands(@PathVariable int id) {
//
//		imsService.deleteBrand(id);
//
////		return "brand deleted successfully..";
//
//	}
}
