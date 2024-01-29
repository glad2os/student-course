import { Request, Response } from 'express';

class StudentController {
  static async getAllStudents(req: Request, res: Response) {
    try {
      const studentService = req.studentService!;
      const students = await studentService.listAllStudents();
      res.status(200).json(students);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async createStudent(req: Request, res: Response) {
    try {
      const studentService = req.studentService!;
      const student = await studentService.addStudent(req.body);
      res.status(201).json(student);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getStudentById(req: Request, res: Response) {
    try {
      const studentService = req.studentService!;

      const student = await studentService.findStudentById(req.params.studentId);
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json(student);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateStudentById(req: Request, res: Response) {
    try {
      const studentService = req.studentService!;

      const updatedStudent = await studentService.updateStudentById(req.params.studentId, req.body);
      if (!updatedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json(updatedStudent);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteStudentById(req: Request, res: Response) {
    try {
      const studentService = req.studentService!;

      const deletedStudent = await studentService.deleteStudentById(req.params.studentId);
      if (!deletedStudent) {
        return res.status(404).json({ error: 'Student not found' });
      }
      res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default StudentController;

