/* eslint-disable react/prop-types */
import { Menu, MenuButton } from "@headlessui/react";
import { MdDelete } from "react-icons/md";
import axios from "axios";
import { useEffect, useState } from "react";
import apiRequest from "../lib/apiRequest";

const Card = ({ data }) => {
	const { movieId, playlistId, setMoviesId } = data;
	const [movieDetails, setMovieDetails] = useState(null);

	const getData = async () => {
		try {
			const { data } = await axios.get(
				`https://www.omdbapi.com/?i=${movieId}&apikey=3fda58e2`
			);
			setMovieDetails(data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		await apiRequest.delete(`/movie/${playlistId}/${movieId}`);
		setMoviesId((prevMovie) => prevMovie.filter((id) => id !== movieId));
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		movieDetails && (
			<div
				key={movieDetails.imdbID}
				className="group relative bg-gray-200 rounded-md pb-2"
			>
				<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
					<img
						src={movieDetails.Poster}
						alt=""
						className="h-full w-full object-cover object-center lg:h-full lg:w-full"
					/>
				</div>
				<div className="mt-4 flex justify-between">
					<div className="pl-1">
						<h3 className="text-sm text-gray-700">
							<span aria-hidden="true" />
							{movieDetails.Title}
						</h3>
						<p className="mt-1 text-sm text-gray-500">{movieDetails.Year}</p>
					</div>

					<Menu as="div" className="relative inline-block text-left pr-2">
						<MenuButton
							onClick={handleDelete}
							className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
						>
							Delete
							<MdDelete size="1em" className="cursor-pointer" />
						</MenuButton>
						<div></div>
					</Menu>
				</div>
			</div>
		)
	);
};
export default Card;
