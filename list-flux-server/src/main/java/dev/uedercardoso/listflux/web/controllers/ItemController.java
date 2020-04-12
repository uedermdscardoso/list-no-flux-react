package dev.uedercardoso.listflux.web.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dev.uedercardoso.listflux.domain.model.Item;
import dev.uedercardoso.listflux.domain.services.ItemService;
import dev.uedercardoso.listflux.exceptions.ItemNotFoundException;
import dev.uedercardoso.listflux.exceptions.ListEmptyException;

@RestController
@RequestMapping("/items")
public class ItemController {

	@Autowired
	private ItemService itemService;

	@GetMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<List<Item>> getAll(){
		try {
			List<Item> items = this.itemService.getAllItems();
			
			return ResponseEntity.ok(items);
			
		} catch(ListEmptyException e) {
			return ResponseEntity.noContent().build();
		} catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	
	@PostMapping
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Item> save(@Valid @RequestBody Item item){
		try {
			
			item = this.itemService.addItem(item);
			
			return ResponseEntity.ok(item);
			
		} catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}
	
	@DeleteMapping("/{id}")
	@CrossOrigin(origins = "http://localhost:3000")
	public ResponseEntity<Void> delete(@PathVariable Long id){
		try {
			this.itemService.removeItem(id);
			
			return ResponseEntity.ok().build();
			
		} catch(ItemNotFoundException e) {
			return ResponseEntity.notFound().build();
		} catch(Exception e) {
			return ResponseEntity.badRequest().build();
		}
	}

}
