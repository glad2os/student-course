import CourseService from '@services/CourseService';
import { StudentService } from '@services/StudentService';

declare module 'express-serve-static-core' {
  interface Request {
    studentService?: StudentService;
    courseService?: CourseService;
  }
}

