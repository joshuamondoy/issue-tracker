package com.issuetracker.api.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.issuetracker.api.entity.Ticket;
import com.issuetracker.api.repository.TicketRepository;

@Service
public class TicketService {

	@Autowired
	private TicketRepository ticketRepository;
	
	public List<Ticket> searchTicket(String query) {
		List<Ticket> tickets = ticketRepository.searchTickets(query);
		return tickets;
		
	}
	
	public List<Ticket> getTickets() {
		return ticketRepository.findAll();
	}
	
	public Ticket getTicket(int id) {
		return ticketRepository.findById(id).get();
	}
	
	public Ticket addTicket(Ticket ticket)  {
		return ticketRepository.save(ticket);
	}
	
	public ResponseEntity<Ticket> updateTicket(int id, Ticket ticket) {
		Ticket updatedTicket = ticketRepository.save(ticket);
		return new ResponseEntity<Ticket>(updatedTicket, HttpStatus.OK);
	}
	
	public ResponseEntity<Ticket> deleteTicket(int id) {
		 ticketRepository.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	
}
