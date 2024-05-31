import axios from "axios";

const apiRequest = axios.create({
	// baseURL: "https://movie-app-1-4i3z.onrender.com/api", 
	baseURL: "http://localhost:3500/api", 
	withCredentials: true,
});


export default apiRequest;