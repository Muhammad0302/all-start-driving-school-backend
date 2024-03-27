import mongoose, { Model, Schema, Document } from 'mongoose';

interface RateInterface extends Document {
	// instruct_id: mongoose.Types.ObjectId;
	rate: number;
	tax: number;
}

const rateSchema = new Schema<RateInterface>(
	{
		// instruct_id: {
		// 	type: mongoose.Schema.Types.ObjectId,
		// 	ref: 'Instructor',
		// },
		rate: {
			type: Number,
			required: true,
		},
		tax: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

const RateModel: Model<RateInterface> = mongoose.model('Rate', rateSchema);

export { RateInterface };
export default RateModel;
