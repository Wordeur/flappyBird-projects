package com.flappyBird.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.flappyBird.entities.Player;

@Transactional
public interface PlayerRepository extends CrudRepository<Player, Integer>{
	@Query("select p from Player p order by p.score DESC")
	public List<Player> getBestPlayer();
}
