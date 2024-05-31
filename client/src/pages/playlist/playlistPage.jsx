import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import apiRequest from "../../lib/apiRequest";
import Card from "../../components/card";

const PlaylistPage = () => {
	const location = useLocation();
	const { name, _id } = location.state || {};

	const [moviesId, setMoviesId] = useState([]);

	useEffect(() => {
		const getMoviesId = async () => {
			try {
				const userMovies = await apiRequest.get(`/movie/${_id}`);
				setMoviesId(userMovies.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		getMoviesId();
	}, []);

	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					Search Results for {name}....
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{moviesId.map((movieId) => (
						<Card key={movieId} data={{ movieId, playlistId: _id, setMoviesId }} />
					))}
				</div>
			</div>
		</div>
	);
};
export default PlaylistPage;
