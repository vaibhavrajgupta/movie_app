import { useLocation } from "react-router-dom";
import {
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
	Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";

function classNames(...classes) {
	return classes.filter(Boolean).join(" ");
}

const SearchList = () => {
	const location = useLocation();
	const { movies, searchVal } = location.state || { movies: [], searchVal: "" };

	
	// useEffect(() => {
    //     console.log("Search Value:", searchVal); // Logging searchVal to check its value
    // }, [searchVal]);
	

	const [playlists, setPlaylists] = useState([]);
	let getplaylist;

	const handleClick = async (imdbID, playlistId) => {
		try {
			await apiRequest.post(`/movie/${playlistId}/${imdbID}`);
			alert("Movie is added to the playlist");
		} catch (error) {
			console.log(error);
		}
	};

	try {
		getplaylist = async () => {
			const userplaylist = await apiRequest.get("/playlist/getallplaylists");
			setPlaylists(userplaylist.data.data);
		};
	} catch (error) {
		console.log(error);
	}

	useEffect(() => {
		getplaylist();
	}, []);

	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					Search Results for {searchVal}....
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{movies.map((movie) => (
						<div
							key={movie.imdbID}
							className="group relative bg-gray-200 rounded-md pb-2"
						>
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img
									src={movie.Poster}
									alt=""
									className="h-full w-full object-cover object-center lg:h-full lg:w-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div className="pl-1">
									<h3 className="text-sm text-gray-700">
										<span aria-hidden="true" />
										{movie.Title}
									</h3>
									<p className="mt-1 text-sm text-gray-500">{movie.Year}</p>
								</div>

								<Menu as="div" className="relative inline-block text-left pr-2">
									<div>
										<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
											Add
											<ChevronDownIcon
												className="-mr-1 h-5 w-5 text-gray-400"
												aria-hidden="true"
											/>
										</MenuButton>
									</div>

									<Transition
										enter="transition ease-out duration-100"
										enterFrom="transform opacity-0 scale-95"
										enterTo="transform opacity-100 scale-100"
										leave="transition ease-in duration-75"
										leaveFrom="transform opacity-100 scale-100"
										leaveTo="transform opacity-0 scale-95"
									>
										<MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
											<div className="py-1">
												{playlists.map((list) => (
													<MenuItem key={list._id}>
														{({ focus }) => (
															<button
																onClick={() =>
																	handleClick(movie.imdbID, list._id)
																}
																className={classNames(
																	focus
																		? "bg-gray-100 text-gray-900"
																		: "text-gray-700",
																	"block w-full px-4 py-2 text-left text-sm"
																)}
															>
																{list.name}
															</button>
														)}
													</MenuItem>
												))}
											</div>
										</MenuItems>
									</Transition>
								</Menu>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default SearchList;
