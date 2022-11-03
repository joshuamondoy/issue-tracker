export class Ticket {
  constructor(
    public ticketId: number,
    public ticketNumber: string,
    public subject: string,
    public description: string,
    public dateCreated: string,
    public openedBy: string,
    public assignedTo?: string,
    public status?: string,
    public dateClosed?: string,
    public closedBy?: string,
    public resolution?: string
  ) {}
}
