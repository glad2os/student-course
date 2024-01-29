import { Request, Response, NextFunction } from 'express';
import mongoose from '@config/config';

export function mongoConnectionCheck(req: Request, res: Response, next: NextFunction) {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ error: 'Service Unavailable: Cannot connect to MongoDB' });
  }
  next();
}

