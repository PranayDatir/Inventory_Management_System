package com.ims.main.imsServicei;

import java.util.List;
import java.util.Optional;

import com.ims.main.model.Brand;

public interface ImsBrandServicei {

    public Brand saveBrand(Brand b);

	public List<Brand> getAllBrands();

	public Optional<Brand> getSingleBrand(int id);

	public void deleteBrand(int id);
}
