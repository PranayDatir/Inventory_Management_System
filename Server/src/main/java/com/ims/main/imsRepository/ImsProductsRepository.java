package com.ims.main.imsRepository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.ims.main.model.Product;

@Repository
public interface ImsProductsRepository extends CrudRepository<Product, Integer>{

}
