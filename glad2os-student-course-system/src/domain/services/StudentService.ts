import { IStudent } from "@models/StudentModel";
import StudentRepository from "@repositories/StudentRepository";

class StudentService {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  async addStudent(studentData: IStudent): Promise<IStudent> {
    return this.studentRepository.addStudent(studentData);
  }

  async listAllStudents(): Promise<IStudent[]> {
    return this.studentRepository.listAllStudents();
  }

  async listCoursesByStudent(studentId: string): Promise<IStudent | null> {
    return this.studentRepository.listCoursesByStudent(studentId);
  }

  async findStudentById(studentId: string): Promise<IStudent | null> {
    return this.studentRepository.findStudentById(studentId);
  }

  async updateStudentById(studentId: string, studentData: Partial<IStudent>): Promise<IStudent | null> {
    return this.studentRepository.updateStudentById(studentId, studentData);
  }

  async deleteStudentById(studentId: string): Promise<IStudent | null> {
    return this.studentRepository.deleteStudentById(studentId);
  }
}

export default StudentService;
