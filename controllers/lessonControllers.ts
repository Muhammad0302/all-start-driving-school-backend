import { Request, Response } from 'express';
import LessonModel, { LessonInterface } from '../models/lessonModel';

const getAllLessons = async (req: Request, res: Response) => {
  try {
    const lessons = await LessonModel.find();
    res.status(200).json({
      success: true,
      message: 'Lessons retrieved successfully',
      lessons: lessons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const createLesson = async (req: Request, res: Response) => {
  try {
    const lesson = await LessonModel.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      lesson: lesson,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Failed to create lesson',
    });
  }
};

const getLessonById = async (req: Request, res: Response) => {
  try {
    const lesson = await LessonModel.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Lesson retrieved successfully',
      lesson: lesson,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

const updateLesson = async (req: Request, res: Response) => {
  try {
    const updatedLesson = await LessonModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedLesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      lesson: updatedLesson,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: 'Failed to update lesson',
    });
  }
};

const deleteLesson = async (req: Request, res: Response) => {
  try {
    const deletedLesson = await LessonModel.findByIdAndDelete(req.params.id);
    if (!deletedLesson) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
      lesson: deletedLesson,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export { getAllLessons, createLesson, getLessonById, updateLesson, deleteLesson };
