import rateLimit from 'express-rate-limit';

// 100 requests per 5 minutes
export const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 100,
	message: 'Too many requests, please try again after 5 minutes',
	headers: true,
	standardHeaders: true,
	legacyHeaders: false
});

// 5 login attempts per 15 minutes
export const loginLimiter = rateLimit({
	windowMs: 15 * 60 * 1000,
	max: 5,
	message: 'Too many login attempts, please try again after 15 minutes'
});
