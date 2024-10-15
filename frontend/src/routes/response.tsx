import { Link } from "react-router-dom";

import { Popup, PopupItem, PopupSeparator } from "@/components";
import type { ControllerComponentProps } from "@/utils";

export const SuccessComponent = ({ controller }: ControllerComponentProps) => {
	return (
		<Popup visible={controller.onSuccess}>
			<PopupItem>Přihlášení proběhlo úspěšně.</PopupItem>
			<PopupSeparator />
			<Link to="/prehled" onClick={() => controller.clearInvocations()}>
				Pokračovat
			</Link>
		</Popup>
	);
};

export const ErrorComponent = ({ controller }: ControllerComponentProps) => {
	return (
		<Popup visible={controller.onError}>
			<PopupItem>Špatné heslo.</PopupItem>
			<PopupSeparator />
			<Link to="/" onClick={() => controller.clearInvocations()}>
				Zpět
			</Link>
		</Popup>
	);
};
