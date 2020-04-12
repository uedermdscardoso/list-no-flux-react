package dev.uedercardoso.listflux.domain.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import dev.uedercardoso.listflux.domain.model.Item;

public interface ItemRepository extends JpaRepository<Item, Long> {
	
}
