import { Request, Response } from 'express';

class CourseController {
  static async createCourse(req: Request, res: Response) {
    try {
      const courseService = req.courseService!;

      const course = await courseService.addCourse(req.body);
      res.status(201).json(course);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateCourse(req: Request, res: Response) {
    try {
      const courseService = req.courseService!;

      const updatedCourse = await courseService.updateCourse(req.params.courseId, req.body);
      if (!updatedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.status(200).json(updatedCourse);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  static async dropCourse(req: Request, res: Response) {
    try {
      const courseService = req.courseService!;

      const deletedCourse = await courseService.dropCourse(req.params.courseId);
      if (!deletedCourse) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.status(200).json({ message: 'Course deleted successfully' });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listAllCourses(req: Request, res: Response) {
    try {
      const courseService = req.courseService!;

      const courses = await courseService.listAllCourses();
      res.status(200).json(courses);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async listStudentsInCourse(req: Request, res: Response) {
    try {
      const courseService = req.courseService!;

      const course = await courseService.listStudentsInCourse(req.params.courseId);
      if (!course) {
        return res.status(404).json({ error: 'Course not found' });
      }
      res.status(200).json(course.students);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default CourseController;

