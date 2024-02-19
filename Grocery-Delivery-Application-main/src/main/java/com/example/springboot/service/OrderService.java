package com.example.springboot.service;
import java.util.List;
import com.example.springboot.model.Order;


public interface OrderService {
Order addOrder(Order order,long customerId,long cartId); 
	Order getOrderById(long orderId);
	Order updateOrder(Order order,long orderId);
	List<Order> getOrderByCustomerId(long customerId);
	List<Order> getAllOrders();
	//List<Order> getAllOrdersByCartId(long cartId);
	void deleteOrder(long orderId);
	Order addOrderItem(Order order,long customerId);
}