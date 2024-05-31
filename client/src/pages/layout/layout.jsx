import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ReqAuth = () => {
	const id = useSelector((state) => state.user._id);
	if (!id) return <Navigate to="/" />;
	return (
		<div className="content">
			<Outlet />
		</div>
	);
};

export default ReqAuth;
