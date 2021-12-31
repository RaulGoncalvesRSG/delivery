package com.raul.delivery.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.raul.delivery.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

	/*Retornar todos pedidos pendentes (status 0) ordenado dos mais antigos para o mais recente*/
	@Query("SELECT DISTINCT obj FROM Order obj JOIN FETCH obj.products WHERE obj.status = 0 "
			+ " ORDER BY obj.moment ASC")
	List<Order> findOrdersWithProducts();
}
