package com.raul.delivery.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.raul.delivery.entities.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {

}
