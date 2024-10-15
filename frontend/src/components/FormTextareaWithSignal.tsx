import type { Signal } from "@preact/signals-react";

import { FormTextarea } from "./FormTextarea";

type PropsIn = React.TextareaHTMLAttributes<HTMLTextAreaElement>;
type PropsOut = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
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

export const FormTextareaWithSignal = withSignal(FormTextarea);
