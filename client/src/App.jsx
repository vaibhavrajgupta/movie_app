import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignInPage from "./pages/signin/signinPage";
import SignUpPage from "./pages/signup/signupPage";
import HomePage from "./pages/home/homePage";
import RequiredAuth from "./pages/layout/layout.jsx";
import PlaylistPage from "./pages/playlist/playlistPage.jsx";
import SearchList from "./pages/searchlist/searchlist.jsx";

const App = () => {
	const router = createBrowserRouter([
		{
			path: "/",
			children: [
				{ path: "/", element: <SignInPage /> },
				{ path: "/signup", element: <SignUpPage /> },
			],
		},
		{
			path: "/",
			element: <RequiredAuth />,
			children: [{ path: "/home", element: <HomePage /> },
			{path : "/list", element : <SearchList/>},
			{path :"/playlist/:id", element : <PlaylistPage/>}
		],
		},
	]);
	return <RouterProvider router={router} />;
};
export default App;
