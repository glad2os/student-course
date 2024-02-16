import { Model } from 'mongoose';
import { IStudent } from '@models/StudentModel';

class StudentRepository {
  private readonly studentModel: Model<IStudent>;

  constructor(studentModel: Model<IStudent>) {
    this.studentModel = studentModel;
  }

  async addStudent(studentData: IStudent): Promise<IStudent> {
    const student = new this.studentModel(studentData);
    return student.save();
  }

  async listAllStudents(): Promise<IStudent[]> {
    return this.studentModel.find().exec();
  }

  async listCoursesByStudent(studentId: string): Promise<IStudent | null> {
    return this.studentModel.findById(studentId).populate('courses').exec();
  }

  async findStudentById(studentId: string): Promise<IStudent | null> {
    return this.studentModel.findById(studentId).exec();
  }

  async updateStudentById(studentId: string, studentData: Partial<IStudent>): Promise<IStudent | null> {
    return this.studentModel.findByIdAndUpdate(studentId, studentData, { new: true }).exec();
  }

  async deleteStudentById(studentId: string): Promise<IStudent | null> {
    return this.studentModel.findByIdAndDelete(studentId).exec();
  }
}

export default StudentRepository;
