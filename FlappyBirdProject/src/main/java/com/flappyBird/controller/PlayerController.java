package com.flappyBird.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.web.bind.annotation.*;

import com.flappyBird.entities.Player;
import com.flappyBird.model.PlayerInteraction;


@RestController
@RequestMapping("/game")
public class PlayerController {
	@Autowired
	private PlayerInteraction interaction;
	
	@RequestMapping("/get-player")
	public List<Player> getPlayer(){
		return interaction.getBestPlayer();
	}
	
	@RequestMapping(value = "/add-player" , method = RequestMethod.POST)
	public void addUsers(@RequestBody Player p) {
		interaction.addUser(p);
	}
}
