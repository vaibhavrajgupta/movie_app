/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Search = () => {
	const [movies, setMovies] = useState([]);
	const [searchVal, setSearchVal] = useState("");
	const navigate = useNavigate();

	const handleSearch = async (e) => {
		e.preventDefault();

		try {
			const { data } = await axios.get(
				`http://www.omdbapi.com/?s=${searchVal}&apikey=3fda58e2`
			);
			// console.log(data.Response);
			data.Response ? setMovies(() => data.Search) : setMovies(() => []);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		// console.log(movies);
		if (movies.length > 0) {
			navigate("/list", { state: { movies, searchVal } });
		}
	}, [movies, navigate, searchVal]);

	return (
		<div className="flex items-center">
			<form onSubmit={handleSearch}>
				<div className="flex border-none rounded">
					<input
						type="text"
						className="block w-full px-4 py-2 text-gray-900 bg-white border rounded-md border-none border focus:outline-none cursor-pointer"
						placeholder="Search..."
						onChange={(e) => setSearchVal(e.target.value)}
					/>
					<button className="px-4 text-white bg-gray-700 border-l rounded ">
						Search
					</button>
				</div>
			</form>
		</div>
	);
};

export default Search;
