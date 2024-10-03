package com.ims.main.imsServiceIMPL;

import java.util.List;
import java.util.Optional;

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

	@Override
	public List<Product> getAllProducts() {
		// TODO Auto-generated method stub
		return 	(List<Product>) imsproductrepo.findAll();
	}

	@Override
	public Optional<Product> getProduct(int id) {
		// TODO Auto-generated method stub
		return imsproductrepo.findById(id);
	}

}
