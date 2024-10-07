package com.ims.main.imsServiceIMPL;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ims.main.imsRepository.ImsOrderRepository;
import com.ims.main.imsServicei.ImsOrdersServicei;
import com.ims.main.model.Order;


@Service
public class ImsOrderServiceIMPL implements ImsOrdersServicei{

	@Autowired
	ImsOrderRepository imsOrderRepo;
	
	@Override
	public Order saveOrder(Order order) {
		return imsOrderRepo.save(order);
	}

	@Override
	public List<Order> fetchAllOrders() {
		return (List<Order>) imsOrderRepo.findAll();
	}

	@Override
	public Optional<Order> fetchOrder(int id) {
		// TODO Auto-generated method stub
		return imsOrderRepo.findById(id);
	}

	@Override
	public void deleteOrder(int id) {
		// TODO Auto-generated method stub
		imsOrderRepo.deleteById(id);
	}
	
	

	
}
