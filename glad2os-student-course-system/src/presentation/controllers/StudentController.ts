import { Request, Response } from 'express';
import StudentService from '@services/StudentService';

export default class StudentController {
  static async getAllStudents(req: Request, res: Response) {
    try {
      const students = await StudentService.getAllStudents();
      res.status(200).json(students);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async createStudent(req: Request, res: Response) {
    try {
      const student = await StudentService.createStudent(req.body);
      res.status(201).json(student);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}


