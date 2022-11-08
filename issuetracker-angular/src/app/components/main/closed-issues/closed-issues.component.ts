import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-closed-issues',
  templateUrl: './closed-issues.component.html',
  styleUrls: ['./closed-issues.component.scss'],
})
export class ClosedIssuesComponent implements OnInit {
  tickets!: Ticket[];
  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.getTickets();
  }
  private getTickets() {
    this.httpService.getClosedTickets().subscribe((res) => {
      this.tickets = res;
    });
  }
}
