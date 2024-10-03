package com.ims.main.imsServicei;

import java.util.List;
import java.util.Optional;

import com.ims.main.model.Product;

public interface ImsProductsServicei {

	public Product saveProduct(Product product);

	public List<Product> getAllProducts();

	public Optional<Product> getProduct(int id);

}
