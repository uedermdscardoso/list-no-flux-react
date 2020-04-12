package dev.uedercardoso.listflux.exceptions;

public class ItemNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = 1380740482584042149L;

	public ItemNotFoundException() {
		
	}
	
	public ItemNotFoundException(String message) {
		super(message);
	}
	
}
