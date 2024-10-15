type Props = {
	title: string;
	visible: boolean;
};

export const Overlay = ({
	title,
	visible,
	children,
}: React.PropsWithChildren<Props>) => {
	return visible ? (
		<div className="__overlay">
			<div className="__overlay__content">
				<header className="__overlay__header">
					<h2 className="__overlay__heading">{title}</h2>
				</header>
				{children}
			</div>
		</div>
	) : null;
};

export const OverlayGroup = ({ children }: React.PropsWithChildren) => {
	return <div className="__overlay__group">{children}</div>;
};
