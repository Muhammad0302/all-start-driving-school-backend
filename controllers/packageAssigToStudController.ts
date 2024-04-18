import { Request, Response } from 'express';
import packageAssigToStudModel, {
	packageAssigToStudInterface,
} from '../models/packageAssigToStudModel';
import InstructorModel from '../models/instructorModel';
import StudentModel from '../models/studentModel';

const getAllpackagesAssigToStuds = async (req: Request, res: Response) => {
	try {
		const packagesAssigToStuds = await packageAssigToStudModel
			.find()
			.populate('std_id') // Populate package details
			.populate('instructor_id') // Populate instructor details
			.populate('package_id'); // Populate student details

		res.status(200).json({
			success: true,
			message: 'packages assign too students retrieved successfully',
			packagesAssigToStuds: packagesAssigToStuds,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const getAssignPackageByStdId = async (req: Request, res: Response) => {
	try {
		const { id } = req.params; // Extract ID from request parameters

		const packageAssigToStud = await packageAssigToStudModel
			.find({ std_id: id }) // Find the package assignment by ID
			.populate('package_id'); // Populate student details

		if (!packageAssigToStud) {
			// If package assignment is not found, return 404
			return res.status(404).json({
				success: false,
				message: 'Package assignment not found',
			});
		}

		res.status(200).json({
			success: true,
			packageAssigToStud: packageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const createPackageAssigToStud = async (req: Request, res: Response) => {
	try {
		const packageAssigToStud = await packageAssigToStudModel.create(req.body);
		res.status(201).json({
			success: true,
			message: 'Package assign to students created successfully',
			packageAssigToStud: packageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to create package assign to students',
		});
	}
};

const getPackageAssigToStudById = async (req: Request, res: Response) => {
	try {
		const packageAssigToStud = await packageAssigToStudModel.findById(
			req.params.id
		);
		if (!packageAssigToStud) {
			return res.status(404).json({
				success: false,
				message: 'Package assign to students not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Package assign to students retrieved successfully',
			data: packageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const updatePackageAssigToStud = async (req: Request, res: Response) => {
	try {
		const updatedpackageAssigToStud =
			await packageAssigToStudModel.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
		if (!updatedpackageAssigToStud) {
			return res.status(404).json({
				success: false,
				message: 'Package assign to students not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Package assign to students updated successfully',
			packageAssigToStud: updatedpackageAssigToStud,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to update package assign to students',
		});
	}
};

const getStudentsByInstructor = async (req: Request, res: Response) => {
	try {
		const instructorId = req.params.id;

		if (!instructorId) {
			return res.status(400).json({
				success: false,
				message: 'Instructor ID is required',
			});
		}

		const students = await packageAssigToStudModel
			.find(
				{ instructor_id: instructorId },
				{
					// __v: 0,
					// package_id: 0,
					// paymentPlan: 0,
					// paymentType: 0,
					// advance: 0,
					createdAt: 1,
					updatedAt: 1,
					// remainingAmount: 0,
					// instructor_id: 0,
				}
			)
			.populate('std_id')
			.populate('package_id', {
				no_of_lesson: 1,
			});
		const instructor = await InstructorModel.findById(instructorId, {
			firstName: 1,
			lastName: 1,
		});

		res.status(200).json({
			success: true,
			message: 'Students assigned to the instructor retrieved successfully',
			students: students,
			instructor: instructor,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const getInstructorsByStudent = async (req: Request, res: Response) => {
	try {
		const StudentId = req.params.id;

		if (!StudentId) {
			return res.status(400).json({
				success: false,
				message: 'Instructor ID is required',
			});
		}

		const instructors = await packageAssigToStudModel
			.find(
				{ std_id: StudentId },
				{
					_id: 1,
					// __v: 0,
					// package_id: 0,
					// paymentPlan: 0,
					// paymentType: 0,
					// advance: 0,
					// createdAt: 1,
					// updatedAt: 1,
					// remainingAmount: 0,
					// instructor_id: 0,
				}
			)
			.populate('instructor_id')
			.populate('package_id', {
				no_of_lesson: 1,
			});

		const student = await StudentModel.findById(StudentId, {
			firstName: 1,
			lastName: 1,
		});

		res.status(200).json({
			success: true,
			message: 'Instructor assigned to the Students retrieved successfully',
			instructors: instructors,
			student: student,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const deletePackageAssigToStud = async (req: Request, res: Response) => {
	try {
		const deletedpackageAssigToStud =
			await packageAssigToStudModel.findByIdAndDelete(req.params.id);
		if (!deletedpackageAssigToStud) {
			return res.status(404).json({
				success: false,
				message: 'packageAssigToStud not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Package assign to students deleted successfully',
			packageAssigToStud: deletedpackageAssigToStud,
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
	getAllpackagesAssigToStuds,
	createPackageAssigToStud,
	getPackageAssigToStudById,
	updatePackageAssigToStud,
	deletePackageAssigToStud,
	getStudentsByInstructor,
	getAssignPackageByStdId,
	getInstructorsByStudent,
};
