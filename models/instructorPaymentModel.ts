import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface instructorPaymentInterface extends Document {
	instruct_id: mongoose.Types.ObjectId;
	name: String;
	phone_number: number;
	rate: number;
	noOfLessonToPay: number;
	tax: number;
	chaqueNo: number;
	issueDate: Date;
	compensation: number;
}

const instructorPaymentSchema = new Schema<instructorPaymentInterface>(
	{
		instruct_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},
		rate: {
			type: Number,
			required: true,
		},
		noOfLessonToPay: {
			type: Number,
			required: true,
		},
		tax: {
			type: Number,
			required: true,
		},
		chaqueNo: {
			type: Number,
			required: true,
		},
		issueDate: {
			type: Date,
			required: true,
		},
		compensation: {
			type: Number,
			required: true,
		},
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the LessonModel
const InstructorPaymentModel: Model<instructorPaymentInterface> =
	mongoose.model<instructorPaymentInterface>(
		'InstructorPayment',
		instructorPaymentSchema
	);
export { instructorPaymentInterface };
export default InstructorPaymentModel;
