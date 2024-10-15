import { type Signal, signal } from "@preact/signals-react";

import { getEvents, signIn, token } from "@/utils";

export class GlobalFacade {
	// A loading flag.
	private _loading: Signal<boolean> = signal(true);
	// An authorization flag.
	private _auth: Signal<boolean> = signal(false);
	// A collection of event data which are globally accessible.
	private _events: Signal<_Event[]> = signal([]);

	public constructor() {
		// Fetch data.
		getEvents().then((events) => {
			this._events.value = events;
		});

		// Revalidate token upon creation.
		token().then((status) => {
			// Check if the process was successfull.
			if (status === 200) {
				// Authenticate the user.
				this._auth.value = true;
			}

			// Finish loading.
			this._loading.value = false;
		});
	}

	public async authenticate(password: string): Promise<boolean> {
		// Try to sign-in.
		const status = await signIn(password);

		// Check if the process was successfull.
		if (status === 200) {
			// Authenticate the user.
			this._auth.value = true;
		}

		return this._auth.value;
	}

	public refresh() {
		// Get events using the Web API.
		getEvents().then((events) => {
			this._events.value = events;
		});
	}

	public getLoading(): boolean {
		return this._loading.value;
	}

	public getAuth(): boolean {
		return this._auth.value;
	}

	public getEvents(): _Event[] {
		return this._events.value;
	}
}
