import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface instructorPaymentInterface extends Document {
	instruct_id: mongoose.Types.ObjectId;
	name: String;
	phone_number:number; 
	rate: number;
	no_of_lesson: string;
	tax: number;
	total_compensation: number;

}

const instructorPaymentSchema = new Schema<instructorPaymentInterface>(
	{
		instruct_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},
		name: {
			type:String,
	
		},
	
		phone_number: {
				type:Number ,
			    required: true,
			},
		rate:{
            type:Number,
            required:true
        },
		no_of_lesson: {
			type: String,
			required: true,
		},
		tax: {
			type: Number,
			required: true,
		},
        total_compensation:{
            type:Number,
            required:true,
        },
		
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the LessonModel
const InstructorPaymentModel: Model<instructorPaymentInterface> = mongoose.model<instructorPaymentInterface>(
	'InstructorPayment',
	instructorPaymentSchema
);
export {instructorPaymentInterface};
export default InstructorPaymentModel;
