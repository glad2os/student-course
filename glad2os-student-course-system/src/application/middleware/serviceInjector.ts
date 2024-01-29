import { Request, Response, NextFunction } from 'express';
import StudentService from '@services/StudentService';
import StudentRepository from '@repositories/StudentRepository';
import Student from '@models/StudentModel';
import CourseRepository from '@repositories/CourseRepository';
import Course from '@models/CourseModel';
import CourseService from '@services/CourseService';

const studentRepository = new StudentRepository(Student);
const studentService = new StudentService(studentRepository);

const courseRepository = new CourseRepository(Course);
const courseService = new CourseService(courseRepository);

export function injectStudentService(req: Request, res: Response, next: NextFunction) {
  req.studentService = studentService;
  req.courseService = courseService;
  next();
}

