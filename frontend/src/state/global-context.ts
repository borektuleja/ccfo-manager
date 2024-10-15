import { createContext, useContext } from "react";

import type { GlobalFacade } from "./global-facade";

// Create a global context instance.
export const GlobalContext = createContext<GlobalFacade | null>(null);

export const useGlobalContext = () => {
	// Access the global context instance.
	const context = useContext(GlobalContext);

	// Throw an error if no instance is available.
	if (context === null) throw new Error("No GlobalContext instance provider.");

	return context;
};
