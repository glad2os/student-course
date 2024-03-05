import StudentService  from '@services/StudentService';
import CourseService from "@services/CourseService";
import {IResolvers} from "@graphql-tools/utils";

interface Context {
    dataSources: {
        studentService: StudentService;
        courseService: CourseService;
    };
}

export const resolvers: IResolvers<any, Context> = {
    Query: {
        async listAllStudents(_, __, { dataSources }) {
            return dataSources.studentService.listAllStudents();
        },
        async findStudentById(_, { studentId }, { dataSources }) {
            return dataSources.studentService.findStudentById(studentId);
        },
        async listAllCourses(_, __, { dataSources }) {
            return dataSources.courseService.listAllCourses();
        },
        async listStudentsInCourse(_, { courseId }, { dataSources }) {
            return dataSources.courseService.listStudentsInCourse(courseId);
        },
    },
    Mutation: {
        async addStudent(_, { studentData }, { dataSources }) {
            return dataSources.studentService.addStudent(studentData);
        },
        async updateStudentById(_, { studentId, studentData }, { dataSources }) {
            return dataSources.studentService.updateStudentById(studentId, studentData);
        },
        async deleteStudentById(_, { studentId }, { dataSources }) {
            return dataSources.studentService.deleteStudentById(studentId);
        },
        async addCourse(_, { courseData }, { dataSources }) {
            return dataSources.courseService.addCourse(courseData);
        },
        async updateCourse(_, { courseId, courseData }, { dataSources }) {
            return dataSources.courseService.updateCourse(courseId, courseData);
        },
        async dropCourse(_, { courseId }, { dataSources }) {
            return dataSources.courseService.dropCourse(courseId);
        },
    },
};
