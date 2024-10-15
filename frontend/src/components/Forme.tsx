type Props = React.FormHTMLAttributes<HTMLFormElement>;

export const Forme = ({ className, children, ...props }: Props) => {
	return (
		<form className={["__forme", className].join(" ").trim()} {...props}>
			{children}
		</form>
	);
};
