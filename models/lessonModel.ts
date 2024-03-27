import mongoose, { Model, Schema, Document } from 'mongoose';

// Define an interface for the Lesson document
interface LessonInterface extends Document {
	std_id: mongoose.Types.ObjectId;
	instruct_id: mongoose.Types.ObjectId;
	initial_lesson_requested: boolean;
	packages: string[]; // Assuming packages is an array of strings
	no_of_lesson: number;
	road_test_completion: boolean;
	lesson_type: string;
}

// Define the lesson schema
const lessonSchema = new Schema<LessonInterface>(
	{
		std_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Student',
		},
		instruct_id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Instructor',
		},
		initial_lesson_requested: {
			type: Boolean,
			required: true,
		},
		packages: [
			{
				type: String,
				required: true,
			},
		],
		no_of_lesson: {
			type: Number,
			required: true,
		},
		road_test_completion: {
			type: Boolean,
			required: true,
		},
		lesson_type: {
			type: String,
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

export default LessonModel;
