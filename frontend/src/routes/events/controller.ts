import {
	computed,
	signal,
	type ReadonlySignal,
	type Signal,
} from "@preact/signals-react";

import type { GlobalFacade } from "@/state";

export class Controller {
	public searchString: Signal<string> = signal("");
	public events: ReadonlySignal<_Event[]>;

	public constructor(facade: GlobalFacade) {
		// Register computed filter signal.
		this.events = computed(() => {
			// Filter out events which do not match the search string.
			return facade
				.getEvents()
				.filter(({ title }) =>
					title
						.toLocaleLowerCase()
						.includes(this.searchString.value.toLocaleLowerCase()),
				);
		});
	}
}
