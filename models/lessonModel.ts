import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface LessonInterface extends Document {
	instruct_id: mongoose.Types.ObjectId;
	std_id: mongoose.Types.ObjectId;
	package_id:mongoose.Types.ObjectId; 
	no_of_lesson_compeleted: String;
	road_test_completion: boolean;
}

const lessonSchema = new Schema<LessonInterface>(
	{
		instruct_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},
		std_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
	
		package_id: {
				type:mongoose.Schema.Types.ObjectId ,
				ref: 'Package',
				required: true,
			},
		
		no_of_lesson_compeleted: {
			type: String,
			required: true,
		},
		road_test_completion: {
			type: Boolean,
			required: true,
		},
		
	},
	{
		timestamps: true, // Automatically adds createdAt and updatedAt fields
	}
);

// Create the LessonModel
const LessonModel: Model<LessonInterface> = mongoose.model<LessonInterface>(
	'Lesson',
	lessonSchema
);
export {LessonInterface};
export default LessonModel;
