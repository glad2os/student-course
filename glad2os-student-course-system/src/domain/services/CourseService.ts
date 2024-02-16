import { ICourse } from "@models/CourseModel";
import CourseRepository from "@repositories/CourseRepository";

class CourseService {
  private courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async addCourse(courseData: ICourse): Promise<ICourse> {
    return this.courseRepository.addCourse(courseData);
  }

  async updateCourse(courseId: string, updateData: Partial<ICourse>): Promise<ICourse | null> {
    return this.courseRepository.updateCourse(courseId, updateData);
  }

  async dropCourse(courseId: string): Promise<ICourse | null> {
    return this.courseRepository.dropCourse(courseId);
  }

  async listAllCourses(): Promise<ICourse[]> {
    return this.courseRepository.listAllCourses();
  }

  async listStudentsInCourse(courseId: string): Promise<ICourse | null> {
    return this.courseRepository.listStudentsInCourse(courseId);
  }
}

export default CourseService;
