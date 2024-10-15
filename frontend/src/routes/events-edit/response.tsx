import { Link } from "react-router-dom";

import { Popup, PopupItem, PopupSeparator } from "@/components";
import type { ControllerComponentProps } from "@/utils";

type Props = ControllerComponentProps & {
	message: string;
	url?: string;
	onTransition?: () => void;
};

export const SuccessComponent = ({
	controller,
	message,
	url = ".",
	onTransition,
}: Props) => {
	return (
		<Popup visible={controller.onSuccess}>
			<PopupItem>{message}</PopupItem>
			<PopupSeparator />
			<Link
				to={url}
				onClick={() => {
					onTransition?.();
					controller.clearInvocations();
				}}
			>
				Zavřít
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
				Zavřít
			</Link>
		</Popup>
	);
};
