/* eslint-disable react/prop-types */
import { Card } from "@material-tailwind/react";
import { useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io";
import Playlistform from "./playlistform";

const AddPlaylistcard = ({ setPlaylists }) => {
	const [visible, setVisible] = useState(true);

	// const addPlaylist = () => {};

	return (
		<Card className="h-80 w-60 pt-4 pb-8 px-4 rounded-md border-gray-400 bg-gray-200 flex flex-col justify-center items-center">

			{visible ? (
				<IoIosAddCircleOutline
					size="10em"
					style={{ cursor: "pointer" }}
					onClick={() => setVisible(!visible)}
				/>
			) : (
				<Playlistform setPlaylists={setPlaylists} setVisible={setVisible} />
			)}
		</Card>
	);
};

export default AddPlaylistcard;
