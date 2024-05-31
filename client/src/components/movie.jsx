import { MdLibraryAdd } from "react-icons/md";

const Movie = (data) => {

    const {movies} = data;

	return (
		<div className="bg-gray-100">
			<div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
				<h2 className="text-2xl font-bold tracking-tight text-gray-900">
					Movie List
				</h2>
				<div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
					{movies.map((movie) => (
						<div key={movie.imdbID} className="group relative bg-gray-200 rounded-md pb-2">
							<div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
								<img
									src={movie.Poster}
									alt=""
									className="h-full w-full object-cover object-center lg:h-full lg:w-full"
								/>
							</div>
							<div className="mt-4 flex justify-between">
								<div>
									<h3 className="text-sm text-gray-700">
										<span aria-hidden="true" className="absolute inset-0" />
										{movie.Title}
									</h3>
									<p className="mt-1 text-sm text-gray-500">{movie.Year}</p>
								</div>
								<p className="text-sm font-medium cursor-pointer text-gray-900">
									<MdLibraryAdd size="1.5em" style={{ cursor: "pointer" }} />
								</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
export default Movie;
