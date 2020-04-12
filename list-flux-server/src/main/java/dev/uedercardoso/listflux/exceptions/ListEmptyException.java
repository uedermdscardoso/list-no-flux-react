package dev.uedercardoso.listflux.exceptions;

public class ListEmptyException extends RuntimeException {
	
	private static final long serialVersionUID = -4775760174620053687L;

	public ListEmptyException() {
		
	}
	
	public ListEmptyException(String message) {
		super(message);
	}
	
}
