import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface packageAssigToStudInterface extends Document {
	instructor_id: mongoose.Types.ObjectId;
	std_id: mongoose.Types.ObjectId;
	package_id: mongoose.Types.ObjectId;
	paymentPlan: string;
	paymentType: string;
	advance: string;
	remainingAmount: string;
	total: string;
}

const packageAssigToStudSchema = new Schema<packageAssigToStudInterface>(
	{
		instructor_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},

		std_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},

		package_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Package',
			required: true,
		},
		paymentPlan: {
			type: String,
			required: true,
		},
		paymentType: {
			type: String,
		},
		advance: {
			type: String,
		},
		total: {
			type: String,
		},
		remainingAmount: {
			type: String,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the packageAssigToStudModel
const packageAssigToStudModel: Model<packageAssigToStudInterface> =
	mongoose.model<packageAssigToStudInterface>(
		'packageAssigToStud',
		packageAssigToStudSchema
	);
export { packageAssigToStudInterface };
export default packageAssigToStudModel;
