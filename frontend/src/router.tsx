import { useSignals } from "@preact/signals-react/runtime";

import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import {
	EditRoute,
	FormRoute,
	IndexRoute,
	JoinRoute,
	ListRoute,
} from "@/routes";
import { GlobalContext, GlobalFacade } from "@/state";

export const AppRouter = () => {
	// Enable signals within the component.
	useSignals();

	// Create a global state.
	const [facade] = useState(() => new GlobalFacade());

	if (facade.getLoading()) return;

	return (
		<GlobalContext.Provider value={facade}>
			<BrowserRouter basename="/udalosti/">
				<Routes>
					<Route path="/" element={<IndexRoute />} />
					<Route
						path="/prehled"
						element={<ListRoute auth={facade.getAuth()} />}
					/>
					<Route
						path="/vytvorit"
						element={<FormRoute auth={facade.getAuth()} />}
					/>
					<Route
						path="/upravit/:id"
						element={<EditRoute auth={facade.getAuth()} />}
					/>
					<Route path="/rezervovat/:id" element={<JoinRoute />} />
				</Routes>
			</BrowserRouter>
		</GlobalContext.Provider>
	);
};
