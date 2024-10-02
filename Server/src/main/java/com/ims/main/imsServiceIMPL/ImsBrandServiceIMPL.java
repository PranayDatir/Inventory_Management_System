package com.ims.main.imsServiceIMPL;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.exceptions.GlobalExceptionHandler;
import com.ims.main.imsRepository.ImsBrandRepository;
import com.ims.main.imsServicei.ImsBrandServicei;
import com.ims.main.model.Brand;

@Service
public class ImsBrandServiceIMPL implements ImsBrandServicei{

	@Autowired
	ImsBrandRepository ir;
	
	@Override
	public Brand saveBrand(Brand b){

			Brand br = ir.save(b);
			return br;	
	}

	@Override
	public List<Brand> getAllBrands() {
		return (List<Brand>) ir.findAll();
	}

	@Override
	public Optional<Brand> getSingleBrand(int id) {
		return ir.findById(id);
	}

	@Override
	public void deleteBrand(int id) {
		ir.deleteById(id);
	}
}
