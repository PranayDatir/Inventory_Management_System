package com.ims.main.imsServicei;

import java.util.List;
import java.util.Optional;

import com.ims.main.model.Order;

public interface ImsOrdersServicei {

	public Order saveOrder(Order order);

	public List<Order> fetchAllOrders();

	public Optional<Order> fetchOrder(int id);

	public void deleteOrder(int id);

}
