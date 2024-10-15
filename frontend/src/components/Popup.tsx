type Props = {
	visible: boolean;
};

export const Popup = ({
	visible,
	children,
}: React.PropsWithChildren<Props>) => {
	return visible ? (
		<div className="__popup">
			<div className="__popup__content">{children}</div>
		</div>
	) : null;
};

export const PopupItem = ({ children }: React.PropsWithChildren) => {
	return <span className="__popup__item">{children}</span>;
};

export const PopupSeparator = () => {
	return <hr className="__popup__separator" />;
};
