// customTypes.d.ts

import { StudentService } from '@services/StudentService'; // Adjust import path as needed
import { Request } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    studentService: StudentService;
  }
}

