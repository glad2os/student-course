import courseRoutes from '@routes/courseRoutes';
import {studentRoutes} from '@routes/studentRoutes';
import express, {Express} from 'express';
import {ApolloServer} from "apollo-server-express";
import {resolvers} from "./application/appollo/resolvers";
import {typeDefs} from "./application/appollo/schema";
import StudentService from "@services/StudentService";
import CourseService from "@services/CourseService";
import StudentRepository from "@repositories/StudentRepository";
import Student from "@models/StudentModel";
import CourseRepository from "@repositories/CourseRepository";
import Course from "@models/CourseModel";

const cors = require('cors')

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));

const studentRepository = new StudentRepository(Student);
const courseRepository = new CourseRepository(Course);

async function startApolloServer() {
    const exp = express();
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context: () => ({
            dataSources: {
                studentService: new StudentService(studentRepository),
                courseService: new CourseService(courseRepository),
            },
        }),
    });

    await server.start();
    // @ts-ignore
    server.applyMiddleware({ app: exp });

    const PORT: string | number = process.env.PORT || 4000;
    exp.listen(PORT, () => console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`));
}

startApolloServer();

// Setup routes
app.use('/students', studentRoutes);
app.use('/courses', courseRoutes);
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
