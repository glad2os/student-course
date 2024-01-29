import express from 'express';
import StudentController from '@controllers/StudentController';
const router = express.Router();

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

export default router;

