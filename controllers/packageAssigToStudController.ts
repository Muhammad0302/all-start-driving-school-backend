import { Request, Response } from 'express';
import packageAssigToStudModel, {
	packageAssigToStudInterface,
} from '../models/packageAssigToStudModel';

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
			.find({ instructor_id: instructorId })
			.populate('std_id');

		res.status(200).json({
			success: true,
			message: 'Students assigned to the instructor retrieved successfully',
			students: students,
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
};
