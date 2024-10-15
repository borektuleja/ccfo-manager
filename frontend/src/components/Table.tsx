export const Table = ({ children }: React.PropsWithChildren) => {
	return <table className="__table">{children}</table>;
};

export const TableHead = ({ children }: React.PropsWithChildren) => {
	return <thead className="__table__head">{children}</thead>;
};

export const TableBody = ({ children }: React.PropsWithChildren) => {
	return <tbody className="__table__body">{children}</tbody>;
};

type PropsRow = {
	columns: string;
};

export const TableRow = ({
	columns,
	children,
}: React.PropsWithChildren<PropsRow>) => {
	return (
		<tr className="__table__row" style={{ gridTemplateColumns: columns }}>
			{children}
		</tr>
	);
};

type PropsCell = {
	as?: "td" | "th";
};

export const TableCell = ({
	as = "td",
	children,
}: React.PropsWithChildren<PropsCell>) => {
	const Component = as;
	return <Component className="__table__cell">{children}</Component>;
};
