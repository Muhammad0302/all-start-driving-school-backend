import { Request, Response } from 'express';
import Instructor, { InstructorInterface } from '../models/instructorModel';

const addInstructor = async (req: Request, res: Response) => {
	const { first_name, last_name, phone_number,email,address,dob,gender,driver_licence_number, DI_number } = req.body;

	try {
		const newInstructor: InstructorInterface = new Instructor({
			first_name,
			last_name,
			phone_number,
			email,
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
	const { first_name,last_name, phone_number,email,address,dob,gender,driver_licence_number, DI_number } = req.body;

	try {
		// Find the instructor by ID and update its details
		const result = await Instructor.findByIdAndUpdate(
			instructorId,
			{
				first_name,
				last_name,
				phone_number,
				email,
				address,
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
const deleteInstructor = async (req: Request, res: Response) => {
	const instructorId = req.params.id; // Assuming the instructor ID is passed as a URL parameter

	try {
		// Find the instructor by ID and delete it from the database
		const result = await Instructor.findByIdAndDelete(instructorId);

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
const getAllInstructors = async (req: Request, res: Response) => {
	try {
		// Retrieve all instructors from the database
		const instructors = await Instructor.find();

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

export { addInstructor, updateInstructor, deleteInstructor, getAllInstructors };
