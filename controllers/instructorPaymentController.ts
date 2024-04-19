import { Request, Response } from 'express';
import InstructorPaymentModel, {
	instructorPaymentInterface,
} from '../models/instructorPaymentModel';
import InstructorModel from '../models/instructorModel';
const getAllInstructorPayments = async (req: Request, res: Response) => {
	try {
		// Perform aggregation query
		const instructorPayments = await InstructorModel.aggregate([
			{
				$lookup: {
					from: 'instructorpayments',
					localField: '_id',
					foreignField: 'instruct_id',
					as: 'payments',
				},
			},
			{
				$match: {
					payments: { $ne: [] }, // Exclude documents where payments array is empty
				},
			},
			{
				$project: {
					_id: 1,
					firstName: 1,
					lastName: 1,
					phone_number: 1,
					email: 1,
					address: 1,
					hired_as: 1,
					dob: 1,
					gender: 1,
					driver_licence_number: 1,
					DI_number: 1,
					no_of_lesson: 1,
					totalPaidLessons: { $sum: '$payments.noOfLessonToPay' },
					totalCompensation: {
						$sum: {
							$map: {
								input: '$payments.compensation',
								as: 'comp',
								in: { $toDouble: '$$comp' },
							},
						},
					},
				},
			},
		]);
		res.status(200).json({
			success: true,
			message: 'Instructor payments retrieved successfully',
			InstructorPayments: instructorPayments,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const createInstructorPayment = async (req: Request, res: Response) => {
	try {
		const InstructorPayment = await InstructorPaymentModel.create(req.body);
		res.status(201).json({
			success: true,
			message: 'Instructor payment created successfully',
			InstructorPayment: InstructorPayment,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to create Instructor payment',
		});
	}
};

const getPaymentByInstructorId = async (req: Request, res: Response) => {
	try {
		const InstructorPayment = await InstructorPaymentModel.find({
			instruct_id: req.params.id,
		});
		if (!InstructorPayment) {
			return res.status(404).json({
				success: false,
				message: 'Instructor payment not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Instructor payment fetch successfully',
			InstructorPayment: InstructorPayment,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const getInstructorPaymentById = async (req: Request, res: Response) => {
	try {
		const InstructorPayment = await InstructorPaymentModel.findById(
			req.params.id
		);
		if (!InstructorPayment) {
			return res.status(404).json({
				success: false,
				message: 'Instructor payment not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Instructor payment retrieved successfully',
			InstructorPayment: InstructorPayment,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			success: false,
			message: 'Internal server error',
		});
	}
};

const updateInstructorPayment = async (req: Request, res: Response) => {
	try {
		const updatedInstructorPayment =
			await InstructorPaymentModel.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
		if (!updatedInstructorPayment) {
			return res.status(404).json({
				success: false,
				message: 'Instructor payment not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Instructor payment updated successfully',
			InstructorPayment: updatedInstructorPayment,
		});
	} catch (error) {
		console.error(error);
		res.status(400).json({
			success: false,
			message: 'Failed to update InstructorPayment',
		});
	}
};

const deleteInstructorPayment = async (req: Request, res: Response) => {
	try {
		const deletedInstructorPayment =
			await InstructorPaymentModel.findByIdAndDelete(req.params.id);
		if (!deletedInstructorPayment) {
			return res.status(404).json({
				success: false,
				message: 'Instructor payment not found',
			});
		}
		res.status(200).json({
			success: true,
			message: 'Instructor payment deleted successfully',
			InstructorPayment: deletedInstructorPayment,
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
	getAllInstructorPayments,
	createInstructorPayment,
	getInstructorPaymentById,
	updateInstructorPayment,
	deleteInstructorPayment,
	getPaymentByInstructorId,
};
