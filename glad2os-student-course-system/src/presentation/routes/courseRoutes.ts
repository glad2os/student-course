import express from "express";
import CourseController from '@controllers/CourseController';
import { injectStudentService } from '@middleware/serviceInjector';
import { mongoConnectionCheck } from '@middleware/mongoConnectionMiddleware';

const courseRoutes = express.Router();
courseRoutes.use(injectStudentService);
courseRoutes.use(mongoConnectionCheck);

// Add a new course
courseRoutes.post('/', CourseController.createCourse);

// Update a course
courseRoutes.put('/:courseId', CourseController.updateCourse);

// Drop a course
courseRoutes.delete('/:courseId', CourseController.dropCourse);

// List all courses
courseRoutes.get('/', CourseController.listAllCourses);

// List all students taking a specific course
courseRoutes.get('/:courseId/students', CourseController.listStudentsInCourse);

export default courseRoutes

