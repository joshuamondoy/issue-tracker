package com.issuetracker.api.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "ticket_table")
public class Ticket {

	@Id
	@Column(name = "ticket_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int ticketId;

	@Column(name = "ticket_number")
	private String ticketNumber;

	@Column(name = "subject")
	private String subject;

	@Column(name = "description")
	private String description;

	@Column(name = "date_created")
	private String dateCreated;

	@Column(name = "opened_by")
	private String openedBy;

	@Column(name = "assigned_to")
	private String assignedTo;

	@Column(name = "status")
	private String status;

	@Column(name = "date_closed")
	private String dateClosed;

	@Column(name = "closed_by")
	private String closedBy;

	@Column(name = "resolution")
	private String resolution;

	public Ticket(int ticketId, String ticketNumber, String subject, String description, String dateCreated,
			String openBy, String assignedTo, String status, String dateClosed, String closedBy, String resolution) {
		this.ticketId = ticketId;
		this.ticketNumber = ticketNumber;
		this.subject = subject;
		this.description = description;
		this.dateCreated = dateCreated;
		this.openedBy = openBy;
		this.assignedTo = assignedTo;
		this.status = status;
		this.dateClosed = dateClosed;
		this.closedBy = closedBy;
		this.resolution = resolution;
	}

	public Ticket() {
		// no args
	}

	public int getTicketId() {
		return ticketId;
	}

	public void setTicketId(int ticketId) {
		this.ticketId = ticketId;
	}

	public String getTicketNumber() {
		return ticketNumber;
	}

	public void setTicketNumber(String ticketNumber) {
		this.ticketNumber = ticketNumber;
	}

	public String getsubject() {
		return subject;
	}

	public void setsubject(String subject) {
		this.subject = subject;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(String dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getOpenedBy() {
		return openedBy;
	}

	public void setOpenedBy(String openBy) {
		this.openedBy = openBy;
	}

	public String getAssignedTo() {
		return assignedTo;
	}

	public void setAssignedTo(String assignedTo) {
		this.assignedTo = assignedTo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getDateClosed() {
		return dateClosed;
	}

	public void setDateClosed(String dateClosed) {
		this.dateClosed = dateClosed;
	}

	public String getClosedBy() {
		return closedBy;
	}

	public void setClosedBy(String closedBy) {
		this.closedBy = closedBy;
	}

	public String getResolution() {
		return resolution;
	}

	public void setResolution(String resolution) {
		this.resolution = resolution;
	}

}
