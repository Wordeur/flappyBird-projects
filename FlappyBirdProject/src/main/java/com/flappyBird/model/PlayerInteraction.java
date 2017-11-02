package com.flappyBird.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flappyBird.dao.PlayerRepository;
import com.flappyBird.entities.Player;


public interface PlayerInteraction {
	public void addUser(Player p);
	public List<Player> getBestPlayer();
	public void generatePlayerForTest();
}
