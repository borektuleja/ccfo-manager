import type { Signal } from "@preact/signals-react";

import { Input } from "./Input";

type PropsIn = React.InputHTMLAttributes<HTMLInputElement>;
type PropsOut = React.InputHTMLAttributes<HTMLInputElement> & {
	signal: Signal<string>;
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

export const InputWithSignal = withSignal(Input);
