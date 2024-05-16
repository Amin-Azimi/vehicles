
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

const rateLimiter = new RateLimiterMemory({
  points: 500, // Number of requests allowed
  duration: 1, // Time window in seconds
});

@Injectable()
export class RateLimiterMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      await rateLimiter.consume(req.ip);
      next();
    } catch (err) {
      res.status(429).send('Too Many Requests'); 
    }
  }
}
