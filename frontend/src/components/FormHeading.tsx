interface Props {
	as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

export const FormHeading = ({
	as = "h1",
	children,
}: React.PropsWithChildren<Props>) => {
	const Component = as;
	return <Component className="__formheading">{children}</Component>;
};
