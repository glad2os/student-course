import express from 'express';
import StudentController from '@controllers/StudentController';
import { injectStudentService } from '@middleware/serviceInjector';
import { mongoConnectionCheck } from '@middleware/mongoConnectionMiddleware';
const router = express.Router();


router.use(injectStudentService);
router.use(mongoConnectionCheck);

// Fetch all students
router.get('/', StudentController.getAllStudents);

// Create a new student
router.post('/', StudentController.createStudent);

// Get a specific student by ID
router.get('/:studentId', StudentController.getStudentById);

// Update a specific student by ID
router.put('/:studentId', StudentController.updateStudentById);

// Delete a specific student by ID
router.delete('/:studentId', StudentController.deleteStudentById);

export { router as studentRoutes }

