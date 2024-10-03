package com.ims.main.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Product {
	

	 @Id
	 @GeneratedValue(strategy = GenerationType.AUTO)
    private int productId;
    private String productName;
    private String productDetails;
    private float purchasePrice;
    private float salePrice;
    private int availabelQuantity;
 
    
    @ManyToOne
    @JoinColumn(name = "brandId")
    private Brand brand;
    
    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
	private List<Order> orders;

}
