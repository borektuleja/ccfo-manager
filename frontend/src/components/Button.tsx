type Props = React.InputHTMLAttributes<HTMLInputElement> & {
	variant?: "danger" | "default";
};

export const Button = ({ variant = "default", className, ...props }: Props) => {
	return (
		<input
			className={["__button", variant, className].join(" ").trim()}
			{...props}
		/>
	);
};
