type Props = {
	title: string;
};

export const Page = ({ title, children }: React.PropsWithChildren<Props>) => {
	return (
		<div className="__page">
			<div className="__page__container">
				<header className="__page__header">
					<h1 className="__page__heading">{title}</h1>
				</header>
				<div className="__page__column">{children}</div>
			</div>
		</div>
	);
};
