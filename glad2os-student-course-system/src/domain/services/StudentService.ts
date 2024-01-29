import { IStudent } from "@models/StudentModel";
import StudentRepository from "@repositories/StudentRepository";

class StudentService {
  private studentRepository: StudentRepository;

  constructor(studentRepository: StudentRepository) {
    this.studentRepository = studentRepository;
  }

  async addStudent(studentData: IStudent): Promise<IStudent> {
    // You can include any business logic here before saving the student
    return this.studentRepository.addStudent(studentData);
  }

  async listAllStudents(): Promise<IStudent[]> {
    return this.studentRepository.listAllStudents();
  }

  async listCoursesByStudent(studentId: string): Promise<IStudent | null> {
    // Additional logic can be added here if necessary
    return this.studentRepository.listCoursesByStudent(studentId);
  }
}

export default StudentService;
