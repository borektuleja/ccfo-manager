type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = ({ className, ...props }: Props) => {
	return (
		<textarea className={["__input", className].join(" ").trim()} {...props} />
	);
};
