import mongoose, { Document, Model } from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentNumber: { type: String, required: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  address: String,
  city: String,
  phoneNumber: String,
  email: { type: String, required: true },
  program: String,
  favoriteTopic: String, // custom field
  strongestSkill: String // custom field
});

//const Student = mongoose.model('Student', studentSchema);

export interface IStudent extends Document {
  studentNumber: string;
  password: string;
  firstName: string;
  lastName: string;
  address?: string;
  city?: string;
  phoneNumber?: string;
  email: string;
  program?: string;
  favoriteTopic?: string;
  strongestSkill?: string;
}

const Student: Model<IStudent> = mongoose.model<IStudent>('Student', studentSchema);

export default Student;

