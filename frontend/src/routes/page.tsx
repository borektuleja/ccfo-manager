import { useSignals } from "@preact/signals-react/runtime";

import { useState } from "react";

import { Button, Form, InputWithSignal, Page } from "@/components";
import { useGlobalContext } from "@/state";
import { Navigate } from "react-router-dom";
import { Controller } from "./controller";

export const IndexRoute = () => {
	// Enable signals within the component.
	useSignals();

	// Access the global context.
	const facade = useGlobalContext();
	// Instantiate a controller.
	const [controller] = useState(() => new Controller(facade));

	return !facade.getAuth() ? (
		<Page title="Systémové přihlášení">
			<Form onSubmit={(event) => controller.submit(event)}>
				<InputWithSignal
					signal={controller.password}
					type="password"
					placeholder="Heslo"
				/>
				<Button type="submit" value="Přihlásit se" />
			</Form>
			{controller.onSuccess && controller.onSuccessComponent}
			{controller.onError && controller.onErrorComponent}
		</Page>
	) : (
		<Navigate to="/prehled" />
	);
};
