package com.issuetracker.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.issuetracker.api.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Integer>{

	List<Ticket> findByAssignedTo(String name);

}
