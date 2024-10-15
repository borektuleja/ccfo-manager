import { Link } from "react-router-dom";

import { Popup, PopupItem, PopupSeparator } from "@/components";
import type { ControllerComponentProps } from "@/utils";

export const SuccessComponent = ({ controller }: ControllerComponentProps) => {
	return (
		<Popup visible={controller.onSuccess}>
			<PopupItem>Událost byla úspešně vytvořena.</PopupItem>
			<PopupSeparator />
			<Link to="/prehled" onClick={() => controller.clearInvocations()}>
				Zpět
			</Link>
		</Popup>
	);
};

export const ErrorComponent = ({ controller }: ControllerComponentProps) => {
	return (
		<Popup visible={controller.onError}>
			<PopupItem>Operaci se nepodařilo dokončit.</PopupItem>
			<PopupSeparator />
			<Link to="." onClick={() => controller.clearInvocations()}>
				Zpět
			</Link>
		</Popup>
	);
};
