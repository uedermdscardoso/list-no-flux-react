package dev.uedercardoso.listflux.domain.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dev.uedercardoso.listflux.domain.model.Item;
import dev.uedercardoso.listflux.domain.repositories.ItemRepository;
import dev.uedercardoso.listflux.exceptions.ItemNotFoundException;
import dev.uedercardoso.listflux.exceptions.ListEmptyException;

@Service
public class ItemService {

	@Autowired
	private ItemRepository itemRepository;
	
	public List<Item> getAllItems() {
		List<Item> items = this.itemRepository.findAll();
		if(items == null || items.size() == 0)
			throw new ListEmptyException("has no items");
		return items;
	}
	
	public Item addItem(Item item) {
		return this.itemRepository.save(item);
	}
	
	public void removeItem(Long id) {
		if(!this.itemRepository.existsById(id))
			throw new ItemNotFoundException("Item "+id+" not found");
		this.itemRepository.deleteById(id);
	}
	
}
