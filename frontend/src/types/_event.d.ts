interface _Event {
	id: number;
	title: string;
	scheduled_on: string;
	capacity: number | null;
	reservations: _Reservation[];
}
