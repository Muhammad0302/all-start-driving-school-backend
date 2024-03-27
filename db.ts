import mongoose from 'mongoose';
require('dotenv').config();
const connectDb = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://muhammadismail:${process.env.DB_PASSWORD}@cluster0.op0njnj.mongodb.net/`,
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			} as Parameters<typeof mongoose.connect>[1]
		);
		console.log('MongoDb is connected');
	} catch (error: any) {
		console.log(error.message);
	}
};

export default connectDb;
