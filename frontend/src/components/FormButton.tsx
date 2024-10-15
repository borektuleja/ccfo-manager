export const FormButton = ({
	className,
	...props
}: React.InputHTMLAttributes<HTMLInputElement>) => {
	return (
		<input
			className="font-medium font-[Poppins] px-2 py-2.5 border border-neutral-700/80 rounded-lg outline-none box-content bg-neutral-500/20 text-sm uppercase tracking-wider transition cursor-pointer hover:border-neutral-500/80 focus:border-neutral-500/80 text-white"
			{...props}
		/>
	);
};
