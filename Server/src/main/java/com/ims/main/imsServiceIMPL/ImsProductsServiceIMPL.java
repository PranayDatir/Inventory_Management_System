package com.ims.main.imsServiceIMPL;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.main.imsRepository.ImsProductsRepository;
import com.ims.main.imsServicei.ImsProductsServicei;
import com.ims.main.model.Product;

@Service
public class ImsProductsServiceIMPL implements ImsProductsServicei{

	
	@Autowired
	ImsProductsRepository imsproductrepo;
	
	@Override
	public Product saveProduct(Product product) {
		Product pr = imsproductrepo.save(product);
		return pr;
	}

}
