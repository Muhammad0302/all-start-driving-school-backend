import { Request, Response } from 'express';
import Student, { StudentInterface } from '../models/studentModel'; // Assuming the model file and interface are appropriately defined

const addStudent = async (req: Request, res: Response) => {
	const {
		instructor_id,
		supportive_id,
		name,
		address,
		phone_number,
		licence_no,
		mto_certification,
		total_payment_received,
		score,
		licence_issue_date,
		licence_expiry_date,
		course_start_date,
	} = req.body;

	try {
		const newStudent: StudentInterface = new Student({
			instructor_id,
			supportive_id,
			name,
			address,
			phone_number,
			licence_no,
			mto_certification,
			total_payment_received,
			score,
			licence_issue_date,
			licence_expiry_date,
			course_start_date,
		});

		// Save the new student to the database
		const result = await newStudent.save();
		// Check if the student was saved successfully
		if (result) {
			// If the student was saved successfully, send success response
			res.status(201).json({
				success: true,
				message: 'Student added successfully',
				student: result, // Send the added student data in the response
			});
		} else {
			// If there was an issue saving the student, send a server error response
			res.status(500).json({
				success: false,
				message: 'Failed to add student',
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

const updateStudent = async (req: Request, res: Response) => {
	const studentId = req.params.id; // Assuming the student ID is passed as a URL parameter
	const {
		instructor_id,
		supportive_id,
		name,
		address,
		phone_number,
		licence_no,
		mto_certification,
		total_payment_received,
		score,
		licence_issue_date,
		licence_expiry_date,
		course_start_date,
	} = req.body;

	try {
		// Find the student by ID and update its details
		const result = await Student.findByIdAndUpdate(
			studentId,
			{
				instructor_id,
				supportive_id,
				name,
				address,
				phone_number,
				licence_no,
				mto_certification,
				total_payment_received,
				score,
				licence_issue_date,
				licence_expiry_date,
				course_start_date,
			},
			{ new: true }
		); // Set { new: true } to return the updated student

		// Check if the student was found and updated successfully
		if (result) {
			// If the student was updated successfully, send success response
			res.status(200).json({
				success: true,
				message: 'Student updated successfully',
				student: result, // Send the updated student data in the response
			});
		} else {
			// If the student was not found, send a not found response
			res.status(404).json({
				success: false,
				message: 'Student not found',
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
const deleteStudent = async (req: Request, res: Response) => {
	const studentId = req.params.id; // Assuming the student ID is passed as a URL parameter

	try {
		// Find the student by ID and delete it from the database
		const result = await Student.findByIdAndDelete(studentId);

		// Check if the student was found and deleted successfully
		if (result) {
			// If the student was deleted successfully, send success response
			res.status(200).json({
				success: true,
				message: 'Student deleted successfully',
			});
		} else {
			// If the student was not found, send a not found response
			res.status(404).json({
				success: false,
				message: 'Student not found',
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
const getAllStudents = async (req: Request, res: Response) => {
	try {
		// Retrieve all students from the database
		const students = await Student.find();

		// Check if there are students available
		if (students.length > 0) {
			// If there are students available, send success response with student data
			res.status(200).json({
				success: true,
				message: 'Students retrieved successfully',
				students: students,
			});
		} else {
			// If no students are found, send a not found response
			res.status(404).json({
				success: false,
				message: 'No students found',
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

export { addStudent, updateStudent, deleteStudent, getAllStudents };
