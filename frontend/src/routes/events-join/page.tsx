import { useSignals } from "@preact/signals-react/runtime";

import { useState } from "react";
import { useParams } from "react-router-dom";

import {
	Container,
	FormButton,
	FormInputWithSignal,
	FormTextareaWithSignal,
	Tag,
} from "@/components";
import { useGlobalContext } from "@/state";

import {
	AlertCircle,
	CalendarDays,
	CircleCheck,
	Dumbbell,
	LandPlot,
	Mail,
	Phone,
	User,
	Users,
} from "lucide-react";
import { Controller } from "./controller";

export const JoinRoute = () => {
	// Enable signals within the component.
	useSignals();

	// Access URL parameters.
	const { id } = useParams();

	// Access the global context.
	const facade = useGlobalContext();
	// Instantiate a controller.
	const [controller] = useState(() => new Controller(facade, Number(id)));

	// Read the event value.
	const event = controller.getEvent();

	// Do not render the component if the event doesn't exist.
	if (event === null) return;

	// Compute event date.
	const date = new Date(event.scheduled_on);
	// Compute number of reservations.
	const reserved = event.capacity
		? `${event.reservations.length} / ${event.capacity}`
		: `${event.reservations.length}`;

	return (
		<Container>
			<nav className="py-3 border-b border-neutral-700/80 tracking-wider">
				<div className="container mx-auto px-4 flex items-center text-sm">
					<header className="text-white flex items-center gap-x-3">
						<Dumbbell />
						<h2 className="text-transparent bg-gradient-to-r from-sky-500 to-rose-500 bg-clip-text text-xl font-bold uppercase tracking-wider font-[Poppins]">
							Colliery Made
						</h2>
					</header>
				</div>
			</nav>
			<div className="p-8 pb-32 flex flex-col items-center gap-12">
				<header className="flex flex-col gap-4 items-center">
					<h3 className="text-xl uppercase font-bold tracking-wider text-transparent bg-gradient-to-r from-sky-500 to-rose-500 bg-clip-text font-[Poppins]">
						rezervace k události
					</h3>
					<h1 className="max-w-md md:max-w-lg lg:max-w-3xl text-center text-white text-2xl lg:text-4xl font-medium tracking-wider font-[Poppins]">
						{event.title}
					</h1>
				</header>
				<div className="w-full flex flex-wrap flex-col gap-4 justify-center sm:flex-row">
					<Tag icon={<CalendarDays />} label={date.toLocaleDateString()} />
					<Tag icon={<Users />} label={reserved} />
					<Tag icon={<LandPlot />} label="Colliery CrossFit Ostrava" />
					{event.capacity ? (
						<Tag icon={<AlertCircle />} label="Omezená kapacita" />
					) : (
						<Tag icon={<CircleCheck />} label="Neomezená kapacita" />
					)}
				</div>
				<p className="text-white font-[Poppins] text-justify max-w-4xl">
					Pro vytvoření rezervace na událost vyplňte prosím následující
					formulář. Odesláním formuláře souhlasíte se zpracováním vašich
					osobních údajů v souladu s GDPR.
				</p>
				<form
					onSubmit={(event) => controller.submit(event)}
					className="w-[min(512px,100%)] flex flex-col gap-4"
				>
					<FormInputWithSignal
						icon={<User />}
						type="text"
						placeholder="Vaše jméno a příjmení"
						signal={controller.name}
						required
					/>
					<FormInputWithSignal
						icon={<Mail />}
						type="email"
						placeholder="Vaš e-mail"
						signal={controller.email}
						required
					/>
					<FormInputWithSignal
						icon={<Phone />}
						type="tel"
						placeholder="(+420) XXX-XXX-XXX"
						signal={controller.phone}
					/>
					<FormTextareaWithSignal
						rows={4}
						placeholder="Poznámka k registraci"
						signal={controller.note}
					/>
					<FormButton
						type="submit"
						value="Vytvořit rezervaci"
						disabled={controller.onLoading}
					/>
				</form>
				{controller.onSuccessComponent}
				{controller.onErrorComponent}
			</div>
		</Container>
	);
};
