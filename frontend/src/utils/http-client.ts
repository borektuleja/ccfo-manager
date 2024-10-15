import axios, { type AxiosError } from "axios";

export const signIn = async (password: string): Promise<number> => {
	try {
		// Sign-in using the Web API.
		const response = await axios.post(
			"https://collierycrossfit.com/udalosti/api/auth/sign-in/",
			JSON.stringify({ password }),
		);

		// Return the response status code.
		return response.status;
	} catch (error) {
		// Return the response status code.
		return (error as AxiosError).response?.status ?? -1;
	}
};

export const token = async (): Promise<number> => {
	try {
		// Revalida token using the Web API.
		const response = await axios.post(
			"https://collierycrossfit.com/udalosti/api/session/token/",
		);

		// Return the response status code.
		return response.status;
	} catch (error) {
		// Return the response status code.
		return (error as AxiosError).response?.status ?? -1;
	}
};

export const getEvents = async (): Promise<_Event[]> => {
	try {
		// Fetch events using the Web API.
		const response = await axios.get(
			"https://collierycrossfit.com/udalosti/api/events/",
		);

		// Convert received data to internal types.
		return response.data as _Event[];
	} catch {
		// Return an empty array on error.
		return [];
	}
};

export const createEvent = async (
	title: string,
	scheduled_on: string,
	capacity: number | null,
): Promise<number> => {
	try {
		// Create a new event using the Web API.
		const response = await axios.post(
			"https://collierycrossfit.com/udalosti/api/events/",
			JSON.stringify({
				title,
				scheduled_on,
				capacity,
			}),
		);

		// Return the response status code.
		return response.status;
	} catch (error) {
		// Return the response status code.
		return (error as AxiosError).response?.status ?? -1;
	}
};

export const updateEvent = async (
	id: number,
	title: string,
	scheduled_on: string,
	capacity: number | null,
): Promise<number> => {
	try {
		// Update an existing event using the Web API.
		const response = await axios.patch(
			`https://collierycrossfit.com/udalosti/api/events/${id}/`,
			JSON.stringify({
				id,
				title,
				scheduled_on,
				capacity,
			}),
		);

		// Return the response status code.
		return response.status;
	} catch (error) {
		// Return the response status code.
		return (error as AxiosError).response?.status ?? -1;
	}
};

export const deleteEvent = async (id: number): Promise<number> => {
	try {
		// Delete an existing event using the Web API.
		const response = await axios.delete(
			`https://collierycrossfit.com/udalosti/api/events/${id}`,
		);

		// Return the response status code.
		return response.status;
	} catch (error) {
		// Return the response status code.
		return (error as AxiosError).response?.status ?? -1;
	}
};

export const createReservation = async (
	assigned_to: number,
	author: string,
	email: string,
	phone: string | null,
	note: string | null,
): Promise<number> => {
	try {
		// Create a new reservation using the Web API.
		const response = await axios.post(
			"https://collierycrossfit.com/udalosti/api/reservations/",
			JSON.stringify({ assigned_to, author, email, phone, note }),
		);

		// Return the response status code.
		return response.status;
	} catch (error) {
		// Return the response status code.
		return (error as AxiosError).response?.status ?? -1;
	}
};

export const updateReservation = async (
	id: number,
	author: string,
	email: string,
	phone: string | null,
	note: string | null,
): Promise<number> => {
	try {
		// Update an existing reservation using the Web API.
		const response = await axios.patch(
			`https://collierycrossfit.com/udalosti/api/reservations/${id}`,
			JSON.stringify({
				id,
				author,
				email,
				phone,
				note,
			}),
		);

		// Return the response status code.
		return response.status;
	} catch (error) {
		// Return the response status code.
		return (error as AxiosError).response?.status ?? -1;
	}
};

export const deleteReservation = async (id: number): Promise<number> => {
	try {
		// Delete a existing reservation using the Web API.
		const response = await axios.delete(
			`https://collierycrossfit.com/udalosti/api/reservations/${id}`,
		);

		// Return the response status code.
		return response.status;
	} catch (error) {
		// Return the response status code.
		return (error as AxiosError).response?.status ?? -1;
	}
};
