import { Component, OnInit } from '@angular/core';
import { Ticket } from 'src/app/models/ticket.model';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'app-search-items',
  templateUrl: './search-items.component.html',
  styleUrls: ['./search-items.component.scss'],
})
export class SearchItemsComponent implements OnInit {
  searchedTicket!: Ticket[];
  searchResult!: number;
  constructor(private utilityService: UtilityService) {}

  ngOnInit(): void {
    this.utilityService.searchedTicket.subscribe((res) => {
      this.searchedTicket = res;
      this.searchResult = res.length;
    });
  }
}
