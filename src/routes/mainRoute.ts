import { Router } from 'express';
import { UserRoute } from './UserRoute';
import { creditRoute } from './CreditRoute';

export const mainRoute = Router();

mainRoute.use('/user', UserRoute);
mainRoute.use('/credit', creditRoute);
