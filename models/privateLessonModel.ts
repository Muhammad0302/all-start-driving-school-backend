import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface PrivateLessonInterface extends Document {
	instruct_id: mongoose.Types.ObjectId;
	std_id: mongoose.Types.ObjectId;
	inil_lesson_req: String;
	road_test_req: boolean;
	road_test_completion: boolean;
	no_of_lesson_compeleted: String;
}

const privateLessonSchema = new Schema<PrivateLessonInterface>(
	{
		instruct_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},
		std_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
	
		inil_lesson_req: {
			type:String ,
			required: true,
	    },

		road_test_req: {
			type: Boolean,
			required: true,
		},
        road_test_completion: {
			type: Boolean,
			required: true,
		},
		
		no_of_lesson_compeleted: {
			type: String,
			required: true,
		},
		
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the PrivateLessonModel
const PrivateLessonModel: Model<PrivateLessonInterface> = mongoose.model<PrivateLessonInterface>(
	'PrivateLesson',
	privateLessonSchema
);
export {PrivateLessonInterface};
export default PrivateLessonModel;
