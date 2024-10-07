package com.ims.main.imsRepository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.ims.main.model.Brand;

@Repository
public interface ImsBrandRepository extends JpaRepository<Brand, Integer>{

}
