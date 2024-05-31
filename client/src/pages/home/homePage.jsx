/* eslint-disable no-unused-vars */
import Navbar from "../../components/navbar";
import Playlistcard from "../../components/playlistcard";
import AddPlaylistcard from "../../components/addPlaylist";
import { useSelector } from "react-redux";
import apiRequest from "../../lib/apiRequest";
import { useEffect, useState } from "react";

const HomePage = () => {
	const [playlists, setPlaylists] = useState([]);

	const user = useSelector((state) => state.user);

	useEffect(() => {
		const getPlaylists = async () => {
			try {
				const userplaylist = await apiRequest.get("/playlist/getallplaylists");
				setPlaylists(userplaylist.data.data);
			} catch (error) {
				console.log(error);
			}
		};
		getPlaylists();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="h-2/3 overflow-x-auto p-4 bg-gray-100 grid grid-cols-5 gap-9">
				{playlists.map((list) => (
					<Playlistcard
						data={list}
						key={list._id}
						setPlaylists={setPlaylists}
					/>
				))}
				<AddPlaylistcard setPlaylists={setPlaylists} />
			</div>
		</div>
	);
};

export default HomePage;
