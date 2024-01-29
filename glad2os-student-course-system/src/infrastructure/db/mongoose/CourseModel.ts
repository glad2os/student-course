import mongoose, { Schema, Document, Model } from 'mongoose';

const courseSchema = new Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
  section: String,
  semester: String,
  students: [{
    type: Schema.Types.ObjectId,
    ref: 'Student'
  }]
});

//const Course = mongoose.model('Course', courseSchema);

export interface ICourse extends Document {
  courseCode: string;
  courseName: string;
  section?: string;
  semester?: string;
  students: Schema.Types.ObjectId[];
}

const Course: Model<ICourse> = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
