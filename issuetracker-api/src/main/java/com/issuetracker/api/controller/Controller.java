package com.issuetracker.api.controller;

import java.util.List;
import java.util.Optional;

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
import com.issuetracker.api.service.TicketService;
import com.issuetracker.api.service.UserService;

@CrossOrigin(origins="http://localhost:4200")
@RestController
@RequestMapping("/issuetracker-api") 
public class Controller {

	@Autowired
	private UserService userService;

	@Autowired
	private TicketService ticketService;

	// user
	
	@GetMapping("/users")
	public List<User> getUsers() {
		return userService.getUsers();
	}


	@PostMapping(path = "/add-user")
	public User addUser(@RequestBody User user) {
		return userService.addUser(user);
	}
	

	// ticket

	@GetMapping(path = "/tickets")
	public List<Ticket> getTickets() {
		return ticketService.getTickets();
	}

	@GetMapping("/tickets/{id}")
	public Ticket getTiecketById(@PathVariable int id) {
		return ticketService.getTicket(id);
	}

	@PostMapping("/tickets/add-ticket")
	public Ticket addTicket(@RequestBody Ticket ticket) {
		return ticketService.addTicket(ticket);
	}
	
	@PutMapping("/tickets/{id}")
	public ResponseEntity<Ticket> udpateTicket(@PathVariable int id, @RequestBody Ticket ticket) {
		return ticketService.updateTicket(id, ticket);
	}
	
	@DeleteMapping("/tickets/{id}")
	public ResponseEntity<Ticket> deleteTicket(@PathVariable int id) {
		return ticketService.deleteTicket(id);
	}
	
}
