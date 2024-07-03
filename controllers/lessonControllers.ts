import { Request, Response } from 'express';
import LessonModel, { LessonInterface } from '../models/lessonModel';
import assignModel from '../models/assignModel';
import StudentModel from '../models/studentModel';
import InstructorModel from '../models/instructorModel';
import InstructorPaymentModel from '../models/instructorPaymentModel';
// const getAllLessons = async (req: Request, res: Response) => {
// 	try {
// const lessons = await LessonModel.aggregate([
// 	{
// 		$lookup: {
// 			from: 'students',
// 			localField: 'std_id',
// 			foreignField: '_id',
// 			as: 'student', // Populate the student details
// 		},
// 	},
// 	{
// 		$lookup: {
// 			from: 'instructors',
// 			localField: 'instruct_id',
// 			foreignField: '_id',
// 			as: 'instructor', // Populate the instructor details
// 		},
// 	},
// 	{
// 		$match: {
// 			student: { $ne: [] }, // Exclude documents where student array is empty
// 		},
// 	},
// ]);
// 		const lessons = await LessonModel.find()
// 			.populate('std_id')
// 			.populate('instruct_id');
// 		res.status(200).json({
// 			success: true,
// 			message: 'Lessons retrieved successfully',
// 			lessons: lessons,
// 		});
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({
// 			success: false,
// 			message: 'Internal server error',
// 		});
// 	}
// };

// const getAllLessons = async (req: Request, res: Response) => {
// 	try {
// 		// Perform aggregation query
// 		const lessons = await StudentModel.aggregate([
// 			{
// 				$lookup: {
// 					from: 'lessons',
// 					localField: '_id',
// 					foreignField: 'std_id',
// 					as: 'lessons',
// 				},
// 			},
// 			{
// 				$match: {
// 					lessons: { $ne: [] }, // Exclude documents where payments array is empty
// 				},
// 			},
// 			{
// 				$project: {
// 					_id: 1,
// 					supportive_id: 1,
// 					firstName: 1,
// 					lastName: 1,
// 					phone_number: 1,
// 					email: 1,
// 					address: 1,
// 					dob: 1,
// 					gender: 1,
// 					lesson_id: { $arrayElemAt: ['$lessons._id', 0] },
// 					total_lesson: { $arrayElemAt: ['$lessons.total_lesson', 0] },
// 					total_lesson_completed: { $sum: '$lessons.no_of_lesson_compeleted' },
// 				},
// 			},
// 		]);
// 		res.status(200).json({
// 			success: true,
// 			message: 'Lessons retrieved successfully',
// 			lessons: lessons,
// 		});
// 	} catch (error) {
// 		console.error(error);
// 		res.status(500).json({
// 			success: false,
// 			message: 'Internal server error',
// 		});
// 	}
// };
const getAllLessons = async (req: Request, res: Response) => {
	try {
		// Perform aggregation query
		const lessons = await StudentModel.aggregate([
			{
				$lookup: {
					from: 'lessons',
					localField: '_id',
					foreignField: 'std_id',
					as: 'lessons',
				},
			},
			{
				$match: {
					lessons: { $ne: [] }, // Exclude documents where lessons array is empty
				},
			},
			{
				$sort: {
					'lessons.createdAt': -1, // Sort by createdAt in descending order
				},
			},
			{
				$project: {
					_id: 1,
					supportive_id: 1,
					firstName: 1,
					lastName: 1,
					phone_number: 1,
					email: 1,
					address: 1,
					dob: 1,
					gender: 1,
					lesson_id: { $arrayElemAt: ['$lessons._id', 0] },
					total_lesson: { $arrayElemAt: ['$lessons.total_lesson', 0] },
					total_lesson_completed: { $sum: '$lessons.no_of_lesson_compeleted' },
					instructor_id: { $arrayElemAt: ['$lessons.instruct_id', 0] },
					student_id: { $arrayElemAt: ['$lessons.std_id', 0] }, // Adding the student_id field
				},
			},
		]);
		res.status(200).json({
			success: true,
			message: 'Lessons retrieved successfully',
			lessons: lessons,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const createLesson = async (req: Request, res: Response) => {
	try {
		const {
			std_id,
			instruct_id,
			no_of_lesson_compeleted,
			Cr,
			rate,
			tax,
			issueDate,
			total_lesson,
			road_test_completion,
		} = req.body;

		const updateAssign: any = await assignModel
			.findOne({ std_id })
			.sort({ createdAt: -1, _id: -1 });

		const lessonCompleted =
			updateAssign.no_of_lesson_completed + no_of_lesson_compeleted;
		console.log(
			'The lesson completed and no of lesson is:',
			lessonCompleted,
			updateAssign.no_of_lesson
		);
		if (lessonCompleted >= updateAssign.no_of_lesson) {
			updateAssign.endDate = new Date();
			await updateAssign.save();
		}

		updateAssign.no_of_lesson_completed += no_of_lesson_compeleted;
		// updateAssign.no_of_lesson -= no_of_lesson_compeleted;
		// updateAssign.road_test = road_test_completion;
		if (updateAssign.no_of_lesson_completed === updateAssign.no_of_lesson) {
			const student: any = await StudentModel.findById(std_id);
			student.lesson_completed = 'completed';
			student.save();
		}
		const instructor: any = await InstructorModel.findById(instruct_id);
		instructor.no_of_lesson += no_of_lesson_compeleted;
		instructor.save();
		await updateAssign.save();

		const lastPayment = await InstructorPaymentModel.findOne({
			instruct_id,
		}).sort({ createdAt: -1 });

		// Calculate the new balance
		const newBalance = lastPayment ? lastPayment.Balance + Cr : Cr;

		const newCredit = {
			instruct_id,
			Cr,
			rate,
			tax,
			issueDate,
			noOfLessonToPay: no_of_lesson_compeleted,
			Balance: newBalance,
		};
		await InstructorPaymentModel.create(newCredit);

		const newLessonData = {
			total_lesson,
			std_id,
			instruct_id,
			no_of_lesson_compeleted,
			road_test_completion,
		};

		const lesson = await LessonModel.create(newLessonData);
		res.status(201).json({
			success: true,
			message: 'Lesson created successfully',
			lesson: lesson,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to create lesson',
		});
	}
};

const getLessonById = async (req: Request, res: Response) => {
	try {
		const lesson = await LessonModel.find({ std_id: req.params.id })
			.populate('std_id')
			.populate('instruct_id');
		if (!lesson) {
			return res.status(404).json({
				success: false,
				message: 'Lesson not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Lesson retrieved successfully',
			lesson: lesson,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const updateLesson = async (req: Request, res: Response) => {
	try {
		const updatedLesson = await LessonModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedLesson) {
			return res.status(404).json({
				success: false,
				message: 'Lesson not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Lesson updated successfully',
			lesson: updatedLesson,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to update lesson',
		});
	}
};

const deleteLesson = async (req: Request, res: Response) => {
	try {
		const deletedLesson = await LessonModel.findByIdAndDelete(req.params.id);
		if (!deletedLesson) {
			return res.status(404).json({
				success: false,
				message: 'Lesson not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Lesson deleted successfully',
			lesson: deletedLesson,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export {
	getAllLessons,
	createLesson,
	getLessonById,
	updateLesson,
	deleteLesson,
};
