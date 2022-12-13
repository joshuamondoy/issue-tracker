package com.issuetracker.api.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.issuetracker.api.entity.Ticket;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

	List<Ticket> findByAssignedTo(String name);

	@Query("SELECT t FROM Ticket t WHERE " + "t.ticketNumber LIKE CONCAT('%', :query, '%') OR "
			+ "t.subject LIKE CONCAT('%', :query, '%') OR " + "t.openedBy LIKE CONCAT('%', :query, '%') OR "
			+ "t.assignedTo LIKE CONCAT('%', :query, '%')")
	List<Ticket> searchTickets(String query);

}
