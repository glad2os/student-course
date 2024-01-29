import { Model } from 'mongoose';
import { ICourse } from "@models/CourseModel";

class CourseRepository {
  private readonly courseModel: Model<ICourse>;

  constructor(courseModel: Model<ICourse>) {
    this.courseModel = courseModel;
  }

  async create(courseData: ICourse): Promise<ICourse> {
    try {
      const newCourse = new this.courseModel(courseData);
      const savedCourse = await newCourse.save();
      return savedCourse;
    } catch (error) {
      throw new Error(`Error creating course: ${error}`);
    }
  }

  async update(courseId: string, updateData: Partial<ICourse>): Promise<ICourse | null> {
    try {
      const updatedCourse = await this.courseModel.findByIdAndUpdate(courseId, updateData, { new: true });
      return updatedCourse;
    } catch (error) {
      throw new Error(`Error updating course: ${error}`);
    }
  }

  async delete(courseId: string): Promise<void> {
    try {
      await this.courseModel.findByIdAndDelete(courseId);
    } catch (error) {
      throw new Error(`Error deleting course: ${error}`);
    }
  }

  async findAll(): Promise<ICourse[]> {
    try {
      const courses = await this.courseModel.find().populate('students');
      return courses;
    } catch (error) {
      throw new Error(`Error finding all courses: ${error}`);
    }
  }

  async findStudentsInCourse(courseId: string): Promise<IStudent[]> {
    try {
      const course = await this.courseModel.findById(courseId).populate('students');
      if (course) {
        return course.students;
      }
      return [];
    } catch (error) {
      throw new Error(`Error finding students in course: ${error}`);
    }
  }
}

export default CourseRepository;
