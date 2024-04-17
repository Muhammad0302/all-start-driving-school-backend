import { Request, Response } from 'express';
import StudentPaymentModel, {
	StudentPaymentInterface,
} from '../models/studentPaymentModel';

const getAllPayments = async (req: Request, res: Response) => {
	try {
		const studentPayments = await StudentPaymentModel.find().populate('std_id');
		res.status(200).json({
			success: true,
			message: 'Student payment retrieved successfully',
			studentPayments: studentPayments,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const createPayment = async (req: Request, res: Response) => {
	try {
		const studentPayment = await StudentPaymentModel.create(req.body);
		res.status(201).json({
			success: true,
			message: 'Student payment created successfully',
			studentPayment: studentPayment,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to create Student payment',
		});
	}
};

const getPaymentById = async (req: Request, res: Response) => {
	try {
		const studentPayment = await StudentPaymentModel.findById(req.params.id);
		if (!studentPayment) {
			return res.status(404).json({
				success: false,
				message: 'Student payment not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Student payment retrieved successfully',
			studentPayment: studentPayment,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const updatePayment = async (req: Request, res: Response) => {
	try {
		const updatedStudentPayment = await StudentPaymentModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{ new: true }
		);
		if (!updatedStudentPayment) {
			return res.status(404).json({
				success: false,
				message: 'Student payment not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Student payment updated successfully',
			studentPayment: updatedStudentPayment,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to update student payment',
		});
	}
};

const deletePayment = async (req: Request, res: Response) => {
	try {
		const deletedStudentPayment = await StudentPaymentModel.findByIdAndDelete(
			req.params.id
		);
		if (!deletedStudentPayment) {
			return res.status(404).json({
				success: false,
				message: 'Student payment not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Student payment deleted successfully',
			studentPayment: deletedStudentPayment,
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
	getAllPayments,
	createPayment,
	getPaymentById,
	updatePayment,
	deletePayment,
};
