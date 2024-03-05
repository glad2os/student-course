import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Student {
    id: ID!
    studentNumber: String!
    password: String!
    firstName: String!
    lastName: String!
    address: String
    city: String
    phoneNumber: String
    email: String!
    program: String
    favoriteTopic: String
    strongestSkill: String
  }

  type Course {
    id: ID!
    courseCode: String!
    courseName: String!
    section: String!
    semester: String!
  }

  # Queries
  type Query {
    listAllStudents: [Student]
    findStudentById(studentId: ID!): Student
    listAllCourses: [Course]
    listStudentsInCourse(courseId: ID!): [Student]
  }

  # Mutations
  type Mutation {
    addStudent(studentData: StudentInput): Student
    updateStudentById(studentId: ID!, studentData: StudentInput): Student
    deleteStudentById(studentId: ID!): Student
    addCourse(courseData: CourseInput): Course
    updateCourse(courseId: ID!, courseData: CourseInput): Course
    dropCourse(courseId: ID!): Course
  }

  input StudentInput {
    studentNumber: String!
    password: String!
    firstName: String!
    lastName: String!
    address: String
    city: String
    phoneNumber: String
    email: String!
    program: String
    favoriteTopic: String
    strongestSkill: String
  }

  input CourseInput {
    courseCode: String!
    courseName: String!
    section: String!
    semester: String!
  }
`;
