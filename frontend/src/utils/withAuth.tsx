import { Navigate } from "react-router-dom";

type Props = {
	auth: boolean;
};

export const withAuth = (InternalComponent: React.ComponentType) => {
	return ({ auth }: Props) => {
		return auth ? <InternalComponent /> : <Navigate to={"/"} replace={true} />;
	};
};
