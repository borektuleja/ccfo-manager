type Props = { icon: JSX.Element } & Pick<
	React.InputHTMLAttributes<HTMLInputElement>,
	"type" | "placeholder"
>;

export const FormInput = ({ icon, ...props }: Props) => (
	<div className="relative flex">
		<span className="flex-shrink-0 size-10 absolute left-[1px] top-[1px] border-r border-neutral-700/80 box-content flex justify-center items-center text-neutral-300/50">
			{icon}
		</span>
		<input
			className="flex-grow text-white font-[Poppins] pl-12 pr-2 p-2.5 border border-neutral-700/80 rounded-lg outline-none box-content bg-neutral-700/20 text-sm tracking-wider transition hover:border-neutral-500/80 focus:border-neutral-500/80 placeholder:text-neutral-300/50"
			{...props}
		/>
	</div>
);
