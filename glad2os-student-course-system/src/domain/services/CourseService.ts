import { ICourse } from "@models/CourseModel";
import CourseRepository from "@repositories/CourseRepository";

class CourseService {
  private courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async addCourse(courseData: ICourse): Promise<ICourse> {
    // Insert business logic here if needed
    return this.courseRepository.addCourse(courseData);
  }

  async updateCourse(courseId: string, updateData: Partial<ICourse>): Promise<ICourse | null> {
    // Any validation or additional logic before updating
    return this.courseRepository.updateCourse(courseId, updateData);
  }

  async dropCourse(courseId: string): Promise<ICourse | null> {
    // Additional checks can be performed here
    return this.courseRepository.dropCourse(courseId);
  }

  async listAllCourses(): Promise<ICourse[]> {
    return this.courseRepository.listAllCourses();
  }

  async listStudentsInCourse(courseId: string): Promise<ICourse | null> {
    // Additional logic can be added here if necessary
    return this.courseRepository.listStudentsInCourse(courseId);
  }
}

export default CourseService;
