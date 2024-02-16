// customTypes.d.ts

import { StudentService } from '@services/StudentService';

declare module 'express-serve-static-core' {
  interface Request {
    studentService: StudentService;
  }
}

