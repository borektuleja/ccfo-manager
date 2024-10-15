export const Header = ({ children }: React.PropsWithChildren) => {
	return <header className="__header">{children}</header>;
};

interface Props {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const Heading = ({
	as = "h1",
	children,
}: React.PropsWithChildren<Props>) => {
	const Component = as;
	return <Component className="__heading">{children}</Component>;
};
