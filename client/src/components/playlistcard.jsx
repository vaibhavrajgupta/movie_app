/* eslint-disable react/prop-types */
import {
	Card,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from "@material-tailwind/react";
import { MdDelete } from "react-icons/md";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";

const Playlistcard = ({ data, setPlaylists }) => {
	const { name, _id } = data || {};

	const navigate = useNavigate();

	const handleDelete = async () => {
		try {
			await apiRequest.delete(`/playlist/delete/${_id}`);
			setPlaylists((prevPlaylists) =>
				prevPlaylists.filter((playlist) => playlist._id !== _id)
			);
		} catch (error) {
			console.error("Failed to delete the playlist", error);
		}
	};

	const handleRedirect = (name, _id) => {
		navigate(`/playlist/${_id}`, { state: { name, _id } });
	};

	return (
		<Card className="h-80 w-60 pt-4 pb-8 px-4 rounded-md border-gray-400 bg-gray-200 flex flex-col justify-between">
			<CardBody>
				{name && ( // Conditionally render based on the presence of name property
					<Typography
						variant="h5"
						color="blue-gray"
						className="mb-2 mt-5 flex items-center justify-between"
					>
						{name}
						<MdDelete
							onClick={handleDelete}
							size="1.5em"
							className="cursor-pointer"
						/>
					</Typography>
				)}
			</CardBody>

			<CardFooter className="pt-0">
				<Button onClick={()=>handleRedirect(name, _id)} className="rounded-md pt-2 pb-2">
					Explore
				</Button>
			</CardFooter>
		</Card>
	);
};

export default Playlistcard;
