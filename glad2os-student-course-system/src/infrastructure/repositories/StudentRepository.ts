import { Model } from 'mongoose';
import Student, { IStudent } from '@models/StudentModel';
import Course, { ICourse } from '@models/CourseModel'; // Import the Course model

class StudentRepository {
  private readonly studentModel: Model<IStudent>;

  constructor(studentModel: Model<IStudent>) {
    this.studentModel = studentModel;
  }

  async create(studentData: IStudent): Promise<IStudent> {
    try {
      const newStudent = new this.studentModel(studentData);
      const savedStudent = await newStudent.save();
      return savedStudent;
    } catch (error) {
      throw new Error(`Error creating student: ${error}`);
    }
  }

  async findAll(): Promise<IStudent[]> {
    try {
      const students = await this.studentModel.find();
      return students;
    } catch (error) {
      throw new Error(`Error finding all students: ${error}`);
    }
  }

  async findCoursesForStudent(studentId: string): Promise<ICourse[]> {
    try {
      const student = await this.studentModel.findById(studentId);
      if (!student) {
        return [];
      }

      // Use the student's ObjectId to find courses they are enrolled in
      const courses = await Course.find({ students: student._id }).exec();
      return courses;
    } catch (error) {
      throw new Error(`Error finding courses for student: ${error}`);
    }
  }
}

export default StudentRepository;

