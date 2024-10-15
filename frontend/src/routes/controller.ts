import { signal, type Signal } from "@preact/signals-react";

import type { GlobalFacade } from "@/state";
import { BaseController } from "@/utils";
import { ErrorComponent, SuccessComponent } from "./response";

export class Controller extends BaseController {
	public password: Signal<string> = signal("");

	public constructor(private facade: GlobalFacade) {
		// Call the parents constructor.
		super();
	}

	public submit(event: React.FormEvent<HTMLFormElement>): void {
		// Prevent the default event from happening.
		event.preventDefault();

		// Switch to the processing state.
		this.nextState();

		// Try to authenticate the user.
		this.facade.authenticate(this.password.value).then((success) => {
			// Process the response.
			if (success) this.nextSuccess(SuccessComponent);
			else this.nextError(ErrorComponent);

			// Swith to the idle state.
			this.nextState();
		});
	}
}
