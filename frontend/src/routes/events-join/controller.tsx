import {
	type ReadonlySignal,
	type Signal,
	computed,
	signal,
} from "@preact/signals-react";

import type { GlobalFacade } from "@/state";
import { BaseController, createReservation } from "@/utils";
import { ErrorComponent, SuccessComponent } from "./response";

export class Controller extends BaseController {
	public name: Signal<string> = signal("");
	public email: Signal<string> = signal("");
	public phone: Signal<string> = signal("");
	public note: Signal<string> = signal("");

	private _event: ReadonlySignal<_Event | null>;

	public constructor(
		private facade: GlobalFacade,
		id: number,
	) {
		// Call the parents constructor.
		super();

		// Register computed event signal.
		this._event = computed(() => {
			return facade.getEvents().find((event) => event.id === id) ?? null;
		});
	}

	public submit(event: React.FormEvent<HTMLFormElement>) {
		// Prevent the default event from happening.
		event.preventDefault();

		// The controller switches to the processing state.
		this.nextState();
		this.clearInvocations();

		// Create a new event using the Web API.
		createReservation(
			this._event.value?.id ?? -1,
			this.name.value,
			this.email.value,
			this.phone.value,
			this.note.value,
		).then((code) => {
			// Process the response.
			if (code === 201) {
				this.name.value = "";
				this.email.value = "";
				this.phone.value = "";
				this.note.value = "";
				this.facade.refresh();
				this.nextSuccess(SuccessComponent);
			} else if (code === 403)
				this.nextError((props) => (
					<ErrorComponent
						message="Nedostatek místa, rezervace pro tuto událost jsou již vyčerpány."
						{...props}
					/>
				));
			else
				this.nextError((props) => (
					<ErrorComponent message="Operace se nezdařila." {...props} />
				));

			// The controller switches to the idle state.
			this.nextState();
		});
	}

	public getEvent(): _Event | null {
		return this._event.value;
	}
}
