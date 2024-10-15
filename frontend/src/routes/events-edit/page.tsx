import { useSignals } from "@preact/signals-react/runtime";

import { useState } from "react";
import { MdOutlineZoomIn } from "react-icons/md";
import { SiMicrosoftexcel } from "react-icons/si";
import { useParams } from "react-router-dom";

import {
	Button,
	Form,
	InputWithSignal,
	Navbar,
	Overlay,
	OverlayGroup,
	Page,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
	TextareaWithSignal,
} from "@/components";
import { useGlobalContext } from "@/state";
import { withAuth } from "@/utils";

import { Controller } from "./controller";

export const EditRoute = withAuth(() => {
	// Enable signals within the component.
	useSignals();

	// Access URL parameters.
	const { id } = useParams();

	// Access the global context.
	const facade = useGlobalContext();
	// Instantiate a controller.
	const [controller] = useState(() => new Controller(facade, Number(id)));

	// Do not render the component if the event doesn't exist.
	if (!controller.event.value) return;

	// Compute event date.
	const date = new Date(controller.event.value.scheduled_on);
	// Compute number of reservations.
	const reserved = controller.event.value.capacity
		? `${controller.event.value.reservations.length} / ${controller.event.value.capacity}`
		: `${controller.event.value.reservations.length}`;
	// Format the URL.
	const url = `https://collierycrossfit.com/udalosti/rezervovat/${controller.event.value.id}`;

	return (
		<>
			<Navbar />
			<Page title={`Detail: ${controller.event.value.title}`}>
				<Table>
					<TableHead>
						<TableRow columns="2fr 1fr 1fr">
							<TableCell as="th">Událost</TableCell>
							<TableCell as="th">Datum</TableCell>
							<TableCell as="th">Počet rezervací</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow columns="2fr 1fr 1fr">
							<TableCell>
								<MdOutlineZoomIn size={20} />
								<span onClick={() => controller.openOverlayForEvent()}>
									{controller.event.value.title}
								</span>
							</TableCell>
							<TableCell>{date.toLocaleDateString()}</TableCell>
							<TableCell>{reserved}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Table>
					<TableHead>
						<TableRow columns="1fr 1fr">
							<TableCell as="th">Odkaz k registraci</TableCell>
							<TableCell as="th">Stáhnout rezervace</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow columns="1fr 1fr">
							<TableCell>
								<a href={url}>{url}</a>
							</TableCell>
							<TableCell>
								<SiMicrosoftexcel
									size={20}
									onClick={() => controller.downloadExcel()}
								/>
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
				<Table>
					<TableHead>
						<TableRow columns="1fr 1fr 1fr 2fr">
							<TableCell as="th">Rezervace</TableCell>
							<TableCell as="th">E-mail</TableCell>
							<TableCell as="th">Tel. číslo</TableCell>
							<TableCell as="th">Poznámka</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{controller.event.value?.reservations.map(
							({ id, author, email, phone, note }) => (
								<TableRow columns="1fr 1fr 1fr 2fr" key={id}>
									<TableCell>
										<MdOutlineZoomIn size={20} />
										<span
											onClick={() => controller.openOverlayForReservation(id)}
										>
											{author}
										</span>
									</TableCell>
									<TableCell>{email}</TableCell>
									<TableCell>{phone ?? "-"}</TableCell>
									<TableCell>{note ?? "-"}</TableCell>
								</TableRow>
							),
						)}
					</TableBody>
				</Table>
				<Overlay
					title="Detail: Událost"
					visible={controller.isEditingEvent.value}
				>
					<Form>
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
							placeholder="Datum"
							required
						/>
						<Button
							type="submit"
							value="Uložit změny"
							onClick={() => controller.updateEvent()}
							disabled={controller.onLoading}
						/>
					</Form>
					<OverlayGroup>
						<Button
							type="button"
							value="Smazat událost"
							onClick={() => controller.deleteEvent()}
							disabled={controller.onLoading}
							variant="danger"
						/>
						<Button
							type="button"
							value="Zpět"
							onClick={() => {
								controller.isEditingEvent.value = false;
							}}
							disabled={controller.onLoading}
						/>
					</OverlayGroup>
				</Overlay>
				<Overlay
					title="Detail: Rezervace"
					visible={controller.isEditingReservation.value}
				>
					<Form>
						<InputWithSignal
							signal={controller.author}
							type="text"
							placeholder="Jméno"
							required
						/>
						<InputWithSignal
							signal={controller.email}
							type="text"
							placeholder="E-mail"
							required
						/>
						<InputWithSignal
							signal={controller.phone}
							type="text"
							placeholder="Tel. číslo"
						/>
						<TextareaWithSignal signal={controller.note} rows={5} />
						<Button
							type="submit"
							value="Uložit změny"
							onClick={() => controller.updateReservation()}
							disabled={controller.onLoading}
						/>
					</Form>
					<OverlayGroup>
						<Button
							type="button"
							value="Smazat rezervaci"
							variant="danger"
							onClick={() => controller.deleteReservation()}
							disabled={controller.onLoading}
						/>
						<Button
							type="button"
							value="Zpět"
							onClick={() => {
								controller.isEditingReservation.value = false;
							}}
							disabled={controller.onLoading}
						/>
					</OverlayGroup>
				</Overlay>
				{controller.onSuccessComponent}
				{controller.onErrorComponent}
			</Page>
		</>
	);
});
