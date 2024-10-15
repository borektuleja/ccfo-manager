type Props = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className, ...props }: Props) => {
	return (
		<input className={["__input", className].join(" ").trim()} {...props} />
	);
};
