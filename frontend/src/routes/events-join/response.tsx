import type { ControllerComponentProps } from "@/utils";
import { AlertCircle, CheckCircle } from "lucide-react";

export const SuccessComponent = () => {
	return (
		<div className="flex gap-2">
			<span className="text-green-400">
				<CheckCircle />
			</span>
			<span className="text-white text-left font-[Poppins]">
				Vaše rezervace byla vytvořena.
			</span>
		</div>
	);
};

type Props = ControllerComponentProps & {
	message: string;
};

export const ErrorComponent = ({ message }: Props) => {
	return (
		<div className="flex gap-2">
			<span className="text-red-400">
				<AlertCircle />
			</span>
			<span className="text-red-400 text-left font-[Poppins]">{message}</span>
		</div>
	);
};
