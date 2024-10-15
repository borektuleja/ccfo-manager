type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const FormTextarea = ({ className, ...props }: Props) => {
	return (
		<textarea
			className="resize-none text-white font-[Poppins] p-2.5 border border-neutral-700/80 rounded-lg outline-none box-content bg-neutral-700/20 text-sm tracking-wider transition hover:border-neutral-500/80 focus:border-neutral-500/80 placeholder:text-neutral-300/50"
			{...props}
		/>
	);
};
