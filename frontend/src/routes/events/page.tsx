import { useSignals } from "@preact/signals-react/runtime";

import { useState } from "react";
import { MdOutlineZoomIn } from "react-icons/md";
import { Link } from "react-router-dom";

import {
	InputWithSignal,
	Navbar,
	Page,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from "@/components";
import { useGlobalContext } from "@/state";
import { withAuth } from "@/utils";

import { Controller } from "./controller";

export const ListRoute = withAuth(() => {
	// Enable signals within the component.
	useSignals();

	// Access the global context.
	const facade = useGlobalContext();
	// Instantiate a controller.
	const [controller] = useState(() => new Controller(facade));

	return (
		<>
			<Navbar />
			<Page title="Seznam událostí">
				<InputWithSignal
					signal={controller.searchString}
					type="text"
					placeholder="Vyhledat událost"
				/>
				<Table>
					<TableHead>
						<TableRow columns="2fr 1fr 1fr">
							<TableCell as="th">Název</TableCell>
							<TableCell as="th">Datum</TableCell>
							<TableCell as="th">Rezervace</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{controller.events.value.map(
							({ id, title, scheduled_on, capacity, reservations }) => {
								// Compute event date.
								const date = new Date(scheduled_on);
								// Compute the number of reservations.
								const reserved = capacity
									? `${reservations.length} / ${capacity}`
									: `${reservations.length}`;

								return (
									<TableRow columns="2fr 1fr 1fr" key={id}>
										<TableCell>
											<MdOutlineZoomIn size={20} />
											<Link to={`/upravit/${id}`}>{title}</Link>
										</TableCell>
										<TableCell>{date.toLocaleDateString()}</TableCell>
										<TableCell>{reserved}</TableCell>
									</TableRow>
								);
							},
						)}
					</TableBody>
				</Table>
			</Page>
		</>
	);
});
