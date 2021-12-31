package com.raul.delivery.services;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.raul.delivery.dto.OrderDTO;
import com.raul.delivery.dto.ProductDTO;
import com.raul.delivery.entities.Order;
import com.raul.delivery.entities.OrderStatus;
import com.raul.delivery.entities.Product;
import com.raul.delivery.repositories.OrderRepository;
import com.raul.delivery.repositories.ProductRepository;

@Service
public class OrderService {

	@Autowired
	private OrderRepository repository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Transactional(readOnly = true)		//Evita o lock de escrita no BD
	public List<OrderDTO> findAll(){
		List<Order> list = repository.findOrdersWithProducts();
		return list.stream().map(x -> new OrderDTO(x)).collect(Collectors.toList());
	}
	
	@Transactional
	public OrderDTO insert(OrderDTO dto){
		Order order = new Order(null, dto.getAddress(), dto.getLatitude(), dto.getLongitude(), 
				Instant.now(), OrderStatus.PENDING);
		
		for (ProductDTO p: dto.getProducts()) {		//Loop para fazer as associações
			Product product = productRepository.getById(p.getId());
			order.getProducts().add(product);		//Inicialmente a lista está vazia. Add cada produto
		}
		
		order = repository.save(order);
		return new OrderDTO(order);
	}
}
