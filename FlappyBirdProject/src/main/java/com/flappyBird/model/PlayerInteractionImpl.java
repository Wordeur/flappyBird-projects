package com.flappyBird.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.flappyBird.dao.PlayerRepository;
import com.flappyBird.entities.Player;

@Service
public class PlayerInteractionImpl implements PlayerInteraction {
	@Autowired
	private PlayerRepository repository;
	
	public void addUser(Player p) {
		if(p.getName() != "")
			repository.save(p);
	}
	
	public List<Player> getBestPlayer(){
		List<Player> playerList = (List<Player>) repository.getBestPlayer();
		
		return playerList;
	}
	
	public void generatePlayerForTest() {
		List<Player> p = new ArrayList<Player>();
		p.add(new Player("Licius Layon" , 100));
		p.add(new Player("Cookie Layon" , 150));
		p.add(new Player("Jamal Layon" , 200));
		p.add(new Player("Hakim Layon" , 250));
		p.add(new Player("Jimmy Trackoen" , 130));
		p.add(new Player("Elodie Moreau" , 151));
		p.add(new Player("Camil Trackoen" , 220));
		p.add(new Player("Antoine Secq" , 240));
		p.add(new Player("Renaud Dupond" , 150));
		p.add(new Player("Fred Mousard" , 110));

		repository.save(p);
	}
}
