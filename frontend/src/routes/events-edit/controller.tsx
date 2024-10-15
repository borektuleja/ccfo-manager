import {
	type ReadonlySignal,
	type Signal,
	computed,
	signal,
} from "@preact/signals-react";

import * as XLSX from "xlsx";

import {
	BaseController,
	deleteEvent,
	deleteReservation,
	updateEvent,
	updateReservation,
} from "@/utils";

import type { GlobalFacade } from "@/state";

import { ErrorComponent, SuccessComponent } from "./response";

export class Controller extends BaseController {
	public event: ReadonlySignal<_Event>;

	public title: Signal<string> = signal("");
	public capacity: Signal<string> = signal("");
	public scheduled_on: Signal<string> = signal("");

	public author: Signal<string> = signal("");
	public email: Signal<string> = signal("");
	public phone: Signal<string> = signal("");
	public note: Signal<string> = signal("");

	public isEditingEvent: Signal<boolean> = signal(false);
	public isEditingReservation: Signal<boolean> = signal(false);

	private reservation: Signal<number> = signal(-1);

	public constructor(
		private facade: GlobalFacade,
		id: number,
	) {
		// Call the parents constructor.
		super();

		// Register computed event signal.
		this.event = computed(() => {
			// Find the event which matches the provided ID.
			return facade.getEvents().find((event) => event.id === id)!;
		});
	}

	public openOverlayForEvent(): void {
		// Reset form values.
		this.title.value = this.event.value.title;
		this.capacity.value = this.event.value.capacity?.toString() ?? "";
		this.scheduled_on.value = this.event.value.scheduled_on;

		// Open the editor.
		this.isEditingEvent.value = true;
	}

	public openOverlayForReservation(id: number): void {
		// Find the reservation which matches the provided ID.
		const instance = this.event.value.reservations.find(
			(reservation) => reservation.id === id,
		)!;

		// Reset form values.
		this.author.value = instance.author;
		this.email.value = instance.email;
		this.phone.value = instance.phone ?? "";
		this.note.value = instance.note ?? "";

		// Open the editor.
		this.isEditingReservation.value = true;
		this.reservation.value = id;
	}

	public downloadExcel(): void {
		// Format filename.
		const filename = this.event.value.title
			.toLocaleLowerCase()
			.replace(/ /g, "_");

		// Create a new workbook.
		const workbook = XLSX.utils.book_new();
		// Create a new worksheet from event data.
		const worksheet = XLSX.utils.aoa_to_sheet([
			["Autor", "E-mail", "Tel. číslo"],
			...this.event.value.reservations.map(({ author, email, phone }) => [
				author,
				email,
				phone,
			]),
		]);
		// Append the worksheet to the workbook and download it.
		XLSX.utils.book_append_sheet(workbook, worksheet);
		XLSX.writeFileXLSX(workbook, `${filename}.xlsx`);
	}

	public updateEvent(): void {
		// Convert capacity to a valid value.
		const capacityOrNull = this.capacity.value.length
			? Number(this.capacity.value)
			: null;

		// The controller switches to the processing state.
		this.nextState();

		// Update an existing event using the Web API.
		updateEvent(
			this.event.value.id,
			this.title.value,
			this.scheduled_on.value,
			capacityOrNull,
		).then((code) => {
			// Process the response.
			if (code === 204) {
				this.facade.refresh();
				this.nextSuccess((props) => (
					<SuccessComponent message="Událost byla aktualizována." {...props} />
				));
			} else this.nextError(ErrorComponent);

			// The controller switches to the idle state.
			this.nextState();
		});
	}

	public deleteEvent(): void {
		// The controller switches to the processing state.
		this.nextState();

		// Delete an existing event using the Web API.
		deleteEvent(this.event.value.id).then((code) => {
			// Process the response.
			if (code === 204)
				this.nextSuccess((props) => (
					<SuccessComponent
						message="Událost byla smazána."
						url="/prehled"
						onTransition={() => this.facade.refresh()}
						{...props}
					/>
				));
			else this.nextError(ErrorComponent);

			// The controller switches to the idle state.
			this.nextState();
		});
	}

	public updateReservation(): void {
		// The controller switches to the processing state.
		this.nextState();

		// Update an existing event using the Web API.
		updateReservation(
			this.reservation.value,
			this.author.value,
			this.email.value,
			this.phone.value,
			this.note.value,
		).then((code) => {
			// Process the response.
			if (code === 204) {
				this.facade.refresh();
				this.nextSuccess((props) => (
					<SuccessComponent
						message="Rezervace byla aktualizována."
						{...props}
					/>
				));
			} else this.nextError(ErrorComponent);

			// The controller switches to the idle state.
			this.nextState();
		});
	}

	public deleteReservation(): void {
		// The controller switches to the processing state.
		this.nextState();

		// Delete an existing event using the Web API.
		deleteReservation(this.reservation.value).then((code) => {
			// Process the response.
			if (code === 204) {
				this.facade.refresh();
				this.nextSuccess((props) => (
					<SuccessComponent
						message="Rezervace byla smazána."
						onTransition={() => {
							this.isEditingReservation.value = false;
						}}
						{...props}
					/>
				));
			} else this.nextError(ErrorComponent);

			// The controller switches to the idle state.
			this.nextState();
		});
	}
}
