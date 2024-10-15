type Props = React.FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ className, children, ...props }: Props) => {
	return (
		<form className={["__form", className].join(" ").trim()} {...props}>
			{children}
		</form>
	);
};
