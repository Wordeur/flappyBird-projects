package com.flappyBird;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;

import com.flappyBird.model.PlayerInteraction;

@SpringBootApplication
public class FlappyBirdProjectApplication {

	public static void main(String[] args) {
		ApplicationContext ctx = SpringApplication.run(FlappyBirdProjectApplication.class, args);
		
		//Generer les 10 premiers joueurs
		//ctx.getBean(PlayerInteraction.class).generatePlayerForTest();
	}
}
