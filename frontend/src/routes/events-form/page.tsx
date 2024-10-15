import { useSignals } from "@preact/signals-react/runtime";

import { useState } from "react";

import { Button, Form, InputWithSignal, Navbar, Page } from "@/components";
import { useGlobalContext } from "@/state";
import { withAuth } from "@/utils";

import { Controller } from "./controller";

export const FormRoute = withAuth(() => {
	// Enable signals within the component.
	useSignals();

	// Access the global context.
	const facade = useGlobalContext();
	// Instantiate a controller.
	const [controller] = useState(() => new Controller(facade));

	return (
		<>
			<Navbar />
			<Page title="Nová událost">
				<Form onSubmit={(event) => controller.submit(event)}>
					<InputWithSignal
						signal={controller.title}
						type="text"
						placeholder="Název"
						required
					/>
					<InputWithSignal
						signal={controller.capacity}
						type="number"
						placeholder="Počet míst"
					/>
					<InputWithSignal
						signal={controller.scheduled_on}
						type="date"
						required
					/>
					<Button
						type="submit"
						value="Vytvořit událost"
						disabled={controller.onLoading}
					/>
				</Form>
				{controller.onSuccessComponent}
				{controller.onErrorComponent}
			</Page>
		</>
	);
});
