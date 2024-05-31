/* eslint-disable react/prop-types */
import {
	CardBody,
	CardFooter,
	Typography,
	Button,
} from "@material-tailwind/react";
import apiRequest from "../lib/apiRequest.js";
import { Navigate } from "react-router-dom";

const Playlistform = ({ setPlaylists, setVisible }) => {
	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const name = formData.get("name");

		try {
			const res = await apiRequest.post("/playlist/create", {
				name,
			});

			setPlaylists((prev) => [...prev, res.data.data]);
			setVisible(true);

			e.target.reset();
		} catch (error) {
			console.log(error);
			Navigate("/home");
		}
	};

	return (
		<form
			className="h-full flex flex-col justify-between"
			onSubmit={handleSubmit}
			autoComplete="off"
			autoFocus
		>
			<CardBody>
				<Typography
					variant="h5"
					color="blue-gray"
					className="mb-2 mt-5 flex items-center justify-between"
				>
					Playlist Name
				</Typography>
				<input
					type="text"
					id="name"
					name="name"
					className="rounded-md focus:outline-none px-4"
				/>
			</CardBody>
			<CardFooter className="pt-0 ">
				<Button type="submit" className="rounded-md pt-2 pb-2">
					Add Playlist
				</Button>
			</CardFooter>
		</form>
	);
};

export default Playlistform;
