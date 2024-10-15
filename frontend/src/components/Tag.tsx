type Props = { icon: JSX.Element; label: string; href?: string };

export const Tag = ({ icon, label, href }: Props) => (
	<article className="border border-neutral-700/80 rounded-lg flex items-center text-neutral-300/80 font-[Poppins] font-medium">
		<div className="p-2 border-r border-neutral-700/80 flex-shrink-0">
			{icon}
		</div>
		<header className="px-2 flex items-center">
			<h3 className="text-xs sm:text-sm tracking-wider">
				{href ? (
					<a target="_blank" rel="noreferrer" {...{ href }}>
						{label}
					</a>
				) : (
					<span>{label}</span>
				)}
			</h3>
		</header>
	</article>
);
