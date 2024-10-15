export const Container = ({ children }: React.PropsWithChildren) => {
	return <div className="__container">{children}</div>;
};

export const Column = ({ children }: React.PropsWithChildren) => {
	return <div className="__column">{children}</div>;
};
