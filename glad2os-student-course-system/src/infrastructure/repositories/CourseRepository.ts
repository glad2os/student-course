import { Model } from 'mongoose';
import { ICourse } from '@models/CourseModel';

class CourseRepository {
  private readonly courseModel: Model<ICourse>;

  constructor(courseModel: Model<ICourse>) {
    this.courseModel = courseModel;
  }

  async addCourse(courseData: ICourse): Promise<ICourse> {
    const course = new this.courseModel(courseData);
    return course.save();
  }

  async updateCourse(courseId: string, updateData: Partial<ICourse>): Promise<ICourse | null> {
    return this.courseModel.findByIdAndUpdate(courseId, updateData, { new: true }).exec();
  }

  async dropCourse(courseId: string): Promise<ICourse | null> {
    return this.courseModel.findByIdAndDelete(courseId).exec();
  }

  async listAllCourses(): Promise<ICourse[]> {
    return this.courseModel.find().exec();
  }

  async listStudentsInCourse(courseId: string): Promise<ICourse | null> {
    return this.courseModel.findById(courseId).populate('students').exec();
  }
}

export default CourseRepository;
