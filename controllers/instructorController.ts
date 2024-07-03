import { Request, Response } from 'express';
import Instructor, { InstructorInterface } from '../models/instructorModel';

const addInstructor = async (req: Request, res: Response) => {
	const {
		firstName,
		lastName,
		// hiringOn,
		phone_number,
		email,
		address,
		hired_as,
		dob,
		gender,
		driver_licence_number,
		DI_number,
	} = req.body;

	try {
		const isExist = await Instructor.find({ email });
		const isExistLicence = await Instructor.find({
			driver_licence_number: driver_licence_number,
		});
		if (isExist.length > 0) {
			res.status(500).json({
				success: true,
				message: 'Instructor already exist with the same email',
			});
		} else if (isExistLicence.length > 0) {
			res.status(500).json({
				success: true,
				message: 'Instructor already exist with the same license number',
			});
		} else {
			const newInstructor: InstructorInterface = new Instructor({
				firstName,
				lastName,
				// hiringOn,
				phone_number,
				email,
				hired_as,
				address,
				dob,
				gender,
				driver_licence_number,
				DI_number,
			});

			// Save the new instructor to the database
			const result = await newInstructor.save();
			// Check if the instructor was saved successfully
			if (result) {
				// If the instructor was saved successfully, send success response
				res.status(201).json({
					success: true,
					message: 'Instructor added successfully',
					instructor: result, // Send the added instructor data in the response
				});
			} else {
				// If there was an issue saving the instructor, send a server error response
				res.status(500).json({
					success: false,
					message: 'Failed to add instructor',
				});
			}
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};
const updateInstructor = async (req: Request, res: Response) => {
	const instructorId = req.params.id; // Assuming the instructor ID is passed as a URL parameter
	const {
		firstName,
		lastName,
		phone_number,
		email,
		address,
		// hired_as,
		dob,
		gender,
		driver_licence_number,
		DI_number,
	} = req.body;

	try {
		// Find the instructor by ID and update its details
		const result = await Instructor.findByIdAndUpdate(
			instructorId,
			{
				firstName,
				lastName,
				phone_number,
				email,
				address,
				// hired_as,
				dob,
				gender,
				driver_licence_number,
				DI_number,
			},
			{ new: true }
		); // Set { new: true } to return the updated instructor

		// Check if the instructor was found and updated successfully
		if (result) {
			// If the instructor was updated successfully, send success response
			res.status(200).json({
				success: true,
				message: 'Instructor updated successfully',
				instructor: result, // Send the updated instructor data in the response
			});
		} else {
			// If the instructor was not found, send a not found response
			res.status(404).json({
				success: false,
				message: 'Instructor not found',
			});
		}
	} catch (error) {
		console.error(error);
		// If there was an internal server error, send a server error response
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};
const getInstructorById = async (req: Request, res: Response) => {
	const instructorId = req.params.id; // Assuming the instructor ID is passed as a URL parameter

	try {
		// Find the instructor by ID
		const instructor = await Instructor.findById(instructorId);

		// Check if the instructor exists
		if (instructor) {
			res.status(200).json({
				success: true,
				message: 'Instructor found',
				instructor: instructor,
			});
		} else {
			// If the instructor was not found, send a not found response
			res.status(404).json({
				success: false,
				message: 'Instructor not found',
			});
		}
	} catch (error) {
		console.error(error);
		// If there was an internal server error, send a server error response
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const deleteInstructor = async (req: Request, res: Response) => {
	const instructorId = req.params.id; // Assuming the instructor ID is passed as a URL parameter

	try {
		// Find the instructor by ID and delete it from the database
		// const result = await Instructor.findByIdAndDelete(instructorId);
		const result = await Instructor.findByIdAndUpdate(
			instructorId,
			{ $set: { isDeleted: true } },
			{ new: true }
		);

		// Check if the instructor was found and deleted successfully
		if (result) {
			// If the instructor was deleted successfully, send success response
			res.status(200).json({
				success: true,
				message: 'Instructor deleted successfully',
			});
		} else {
			// If the instructor was not found, send a not found response
			res.status(404).json({
				success: false,
				message: 'Instructor not found',
			});
		}
	} catch (error) {
		console.error(error);
		// If there was an internal server error, send a server error response
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};
const getAllSoftInstructors = async (req: Request, res: Response) => {
	try {
		// Get the isDeleted parameter from the query string
		const { isDeleted } = req.query;

		// Initialize the query object
		let query = {};

		// Modify the query based on the isDeleted parameter
		if (isDeleted !== undefined && isDeleted !== 'NA') {
			// @ts-ignore
			query.isDeleted = isDeleted;
		}

		// Retrieve instructors from the database based on the query
		const instructors = await Instructor.find(query).sort({ createdAt: -1 });

		// Check if there are instructors available
		if (instructors.length > 0) {
			// If there are instructors available, send success response with instructor data
			res.status(200).json({
				success: true,
				message: 'Instructors retrieved successfully',
				instructors: instructors,
			});
		} else {
			// If no instructors are found, send a not found response
			res.status(404).json({
				success: false,
				message: 'No instructors found',
			});
		}
	} catch (error) {
		console.error(error);
		// If there was an internal server error, send a server error response
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const getAllInstructors = async (req: Request, res: Response) => {
	try {
		// Retrieve instructors from the database based on the query
		const instructors = await Instructor.find({ isDeleted: false }).sort({
			createdAt: -1,
		});

		// Check if there are instructors available
		if (instructors.length > 0) {
			// If there are instructors available, send success response with instructor data
			res.status(200).json({
				success: true,
				message: 'Instructors retrieved successfully',
				instructors: instructors,
			});
		} else {
			// If no instructors are found, send a not found response
			res.status(404).json({
				success: false,
				message: 'No instructors found',
			});
		}
	} catch (error) {
		console.error(error);
		// If there was an internal server error, send a server error response
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const getAllUnassignedInstructor = async (req: Request, res: Response) => {
	try {
		const instructors = await Instructor.aggregate([
			{
				$lookup: {
					from: 'packageAssigToStud', // Assuming the collection name is 'packageAssigToStud'
					localField: '_id',
					foreignField: 'instructor_id',
					as: 'assignedStudents',
				},
			},
			{
				$group: {
					_id: '$_id',
					instructor: { $first: '$$ROOT' },
					totalAssignedStudents: { $sum: { $size: '$assignedStudents' } }, // Calculate total assigned students
				},
			},
			{
				$match: {
					totalAssignedStudents: { $lte: 5 }, // Filter out instructors with 5 or fewer assigned students
				},
			},
			{
				$replaceRoot: { newRoot: '$instructor' }, // Replace root document with the instructor document
			},
		]);

		if (instructors.length > 0) {
			res.status(200).json({
				success: true,
				message: 'Instructors retrieved successfully',
				instructors: instructors,
			});
		} else {
			res.status(404).json({
				success: false,
				message: 'No instructors found',
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

export {
	addInstructor,
	updateInstructor,
	deleteInstructor,
	getAllInstructors,
	getAllSoftInstructors,
	getInstructorById,
	getAllUnassignedInstructor,
};
