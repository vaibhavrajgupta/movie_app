import mongoose from "mongoose";

const connectToDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE_URL);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

export default connectToDB;
