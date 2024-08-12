import { Request, Response } from 'express';
import StudentPaymentModel, {
	StudentPaymentInterface,
} from '../models/studentPaymentModel';
import StudentModel from '../models/studentModel';
import mongoose from 'mongoose';
import assignModel from '../models/assignModel';

const getAllPayments = async (req: Request, res: Response) => {
	try {
		// const studentPayments = await StudentPaymentModel.find().populate('std_id');
		// res.status(200).json({
		// 	success: true,
		// 	message: 'Student payment retrieved successfully',
		// 	studentPayments: studentPayments,
		// });

		const studentPayments = await StudentModel.aggregate([
			{
				$lookup: {
					from: 'studentpayments',
					localField: '_id',
					foreignField: 'std_id',
					as: 'payment',
				},
			},
			{
				$match: {
					payment: { $ne: [] }, // Exclude documents where payment array is empty
				},
			},
			{
				$sort: {
					'payment.createdAt': -1, // Sort by createdAt in descending order
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
					payment_id: { $arrayElemAt: ['$payment._id', 0] },
					total_payment: { $sum: '$payment.amount' },
				},
			},
		]);
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
		// Convert req.body.amount to a number
		const amount = Number(req.body.amount);

		if (isNaN(amount)) {
			return res.status(400).json({
				success: false,
				message: 'Invalid amount value',
			});
		}

		// Find the record in the assign table by std_id
		const studentAssignment = await assignModel.findOne({
			std_id: req.body.std_id,
			isDeleted: false, // Ensure you're only dealing with active records
		});

		if (!studentAssignment) {
			return res.status(404).json({
				success: false,
				message: 'Student assignment not found',
			});
		}

		// Update the amountPaid field by adding the new amount
		studentAssignment.amountPaid += amount;

		// Save the updated document
		await studentAssignment.save();

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
		const studentPayment = await StudentPaymentModel.find({
			std_id: req.params.id,
		});
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
const getPaymentSumByStdId = async (req: Request, res: Response) => {
	try {
		const studentId = new mongoose.Types.ObjectId(req.params.id);

		const result = await StudentPaymentModel.aggregate([
			{
				$match: { std_id: studentId },
			},
			{
				$group: {
					_id: '$std_id',
					totalAmount: { $sum: '$amount' },
				},
			},
		]);

		if (!result || result.length === 0) {
			return res.status(203).json({
				success: false,
				message: 'No payment records found for the student',
				paidAmount: 0,
			});
		}

		const { _id, totalAmount } = result[0];

		res.status(200).json({
			success: true,
			message: 'Student payment sum retrieved successfully',

			paidAmount: totalAmount,
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
	getPaymentSumByStdId,
};
