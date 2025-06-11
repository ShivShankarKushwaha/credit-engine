import { Router } from 'express';
import { CreditController } from '../controllers';
import { AuthenticateUser } from '../helpers';

export const creditRoute = Router();
creditRoute.use(AuthenticateUser);
creditRoute.get('/',CreditController.getUserCredits);
creditRoute.post('/', CreditController.issueCredit);
