package dev.uedercardoso.listflux;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ListFluxApplication {

	@Value("${front.cors.config.server}")
	private String server;
	
	@Value("${front.cors.config.port}")
	private Long port;
	
	public static void main(String[] args) throws InterruptedException {
		SpringApplication.run(ListFluxApplication.class, args);
	}
	
	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/items/**").allowedOrigins("http://localhost:3000");
			}
		};
	}
	
}
