import { signal, type Signal } from "@preact/signals-react";

import type { GlobalFacade } from "@/state";
import { BaseController, createEvent } from "@/utils";

import { ErrorComponent, SuccessComponent } from "./response";

export class Controller extends BaseController {
	public title: Signal<string> = signal("");
	public capacity: Signal<string> = signal("");
	public scheduled_on: Signal<string> = signal("");

	public constructor(private facade: GlobalFacade) {
		// Call the parents constructor.
		super();
	}

	public submit(event: React.FormEvent<HTMLFormElement>): void {
		// Prevent the form submission.
		event.preventDefault();

		// Convert capacity to a valid value.
		const capacityOrNull = this.capacity.value.length
			? Number(this.capacity.value)
			: null;

		// The controller switches to the processing state.
		this.nextState();

		// Create a new event using the Web API.
		createEvent(this.title.value, this.scheduled_on.value, capacityOrNull).then(
			(code) => {
				// Process the response.
				if (code === 201) {
					this.facade.refresh();
					this.nextSuccess(SuccessComponent);
				} else this.nextError(ErrorComponent);

				// The controller switches to the idle state.
				this.nextState();
			},
		);
	}
}
