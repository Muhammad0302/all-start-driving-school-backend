import { Request, Response } from 'express';
import InstructorPaymentModel, { instructorPaymentInterface } from '../models/instructorPaymentModel';

const getAllInstructorPayments = async (req: Request, res: Response) => {
  try {
    const InstructorPayments = await InstructorPaymentModel.find();
    res.status(200).json({
      success: true,
      message: 'Instructor payments retrieved successfully',
      InstructorPayments: InstructorPayments,
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

const getInstructorPaymentById = async (req: Request, res: Response) => {
  try {
    const InstructorPayment = await InstructorPaymentModel.findById(req.params.id);
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
    const updatedInstructorPayment = await InstructorPaymentModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
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
    const deletedInstructorPayment = await InstructorPaymentModel.findByIdAndDelete(req.params.id);
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

export { getAllInstructorPayments, createInstructorPayment, getInstructorPaymentById, updateInstructorPayment, deleteInstructorPayment };
