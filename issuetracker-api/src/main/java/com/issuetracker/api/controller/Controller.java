package com.issuetracker.api.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.issuetracker.api.entity.Ticket;
import com.issuetracker.api.entity.User;
import com.issuetracker.api.repository.TicketRepository;
import com.issuetracker.api.repository.UserRepository;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/issuetracker-api") 
public class Controller {

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TicketRepository ticketRepository;

	// user
	@GetMapping("/users")
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/users/{id}")
	public User getUserById(@PathVariable int id) {
		return userRepository.findById(id).get();
	}

	@PostMapping(path = "/add-user")
	public User addUser(@RequestBody User user) {
		return userRepository.save(user);
	}

	@PutMapping(path = "/users/{id}")
	public ResponseEntity<User> udpateUser(@PathVariable int id, @RequestBody User user) {
		User updatedUser = userRepository.save(user);

		return new ResponseEntity<User>(updatedUser, HttpStatus.OK);
	}

	@DeleteMapping(path = "/users/{id}")
	public ResponseEntity<Void> deleteUser(@PathVariable int id) {
		userRepository.deleteById(id);

		return ResponseEntity.noContent().build();
	}

	// ticket

	@GetMapping(path = "/tickets")
	public List<Ticket> getTickets() {
		return ticketRepository.findAll();
	}
	@GetMapping(path = "/tickets/assigned-to/{name}")
	public List<Ticket> getByEmail(@PathVariable String name) {
		return ticketRepository.findByAssignedTo(name);
	}

	@GetMapping("/tickets/{id}")
	public Ticket getTiecketById(@PathVariable int id) {
		return ticketRepository.findById(id).get();
	}

	@PostMapping("/tickets/add-ticket")
	public Ticket addTicket(@RequestBody Ticket ticket) {
		return ticketRepository.save(ticket);
	}
	
	@PutMapping("/tickets/{id}")
	public ResponseEntity<Ticket> udpateTicket(@PathVariable int id, @RequestBody Ticket ticket) {
		Ticket updatedTicket = ticketRepository.save(ticket);
		return new ResponseEntity<Ticket>(updatedTicket, HttpStatus.OK);
	}
	
	@DeleteMapping("/tickets/{id}")
	public ResponseEntity<Ticket> deleteTicket(@PathVariable int id) {
		ticketRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}
	
}
