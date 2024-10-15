import type { Signal } from "@preact/signals-react";

import { FormInput } from "./FormInput";

type PropsIn = React.InputHTMLAttributes<HTMLInputElement> & {
	icon: JSX.Element;
};
type PropsOut = React.InputHTMLAttributes<HTMLInputElement> & {
	signal: Signal<string>;
	icon: JSX.Element;
};

const withSignal = (InternalComponent: React.ComponentType<PropsIn>) => {
	return ({ signal, ...props }: PropsOut) => {
		return (
			<InternalComponent
				value={signal.value}
				onChange={(event) => {
					signal.value = event.target.value;
				}}
				{...props}
			/>
		);
	};
};

export const FormInputWithSignal = withSignal(FormInput);
