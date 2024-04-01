import { Request, Response } from 'express';
import RateModel, { RateInterface } from '../models/rateModel';

const getAllRates = async (req: Request, res: Response) => {
  try {
    const Rates = await RateModel.find();
    res.status(200).json({
      success: true,
      message: 'Rates retrieved successfully',
      Rates: Rates,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const createRate = async (req: Request, res: Response) => {
  try {
    const Rate = await RateModel.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Rate created successfully',
      Rate: Rate,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Failed to create Rate',
    });
  }
};

const getRateById = async (req: Request, res: Response) => {
  try {
    const Rate = await RateModel.findById(req.params.id);
    if (!Rate) {
      return res.status(404).json({
        success: false,
        message: 'Rate not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Rate retrieved successfully',
      Rate: Rate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const updateRate = async (req: Request, res: Response) => {
  try {
    const updatedRate = await RateModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRate) {
      return res.status(404).json({
        success: false,
        message: 'Rate not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Rate updated successfully',
      Rate: updatedRate,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Failed to update Rate',
    });
  }
};

const deleteRate = async (req: Request, res: Response) => {
  try {
    const deletedRate = await RateModel.findByIdAndDelete(req.params.id);
    if (!deletedRate) {
      return res.status(404).json({
        success: false,
        message: 'Rate not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Rate deleted successfully',
      Rate: deletedRate,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export { getAllRates, createRate, getRateById, updateRate, deleteRate };
