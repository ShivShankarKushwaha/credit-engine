import { Request, Response } from 'express';
import { ActionTypes } from '../models';
import { creditSchema } from '../types';
import { creditService } from '../services';
import { User } from '../models';

const issueCredit = async (req: Request, res: Response): Promise<Response> => {
	try {
		const { userId, actionType, amount, metadata } = req.body;

		const { error } = creditSchema.validate(req.body);
		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}

		if (!Object.values(ActionTypes).includes(actionType)) {
			return res.status(400).json({ error: 'Invalid actionType provided.' });
		}

		if (typeof amount !== 'number' || amount <= 0) {
			return res.status(400).json({ error: 'Amount must be a positive number.' });
		}

		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}

		const newCredit = await creditService.issueCredit(userId, actionType, amount, metadata);

		return res.status(201).json({ message: 'Credit issued successfully', credit: newCredit });
	} catch (error: any) {
		return res.status(500).json({ error: 'Failed to issue credit due to an internal server error. ' + error.message });
	}
};

const getUserCredits = async (req: Request, res: Response): Promise<Response> => {
	try {
		const userId = req.params.userId || req?.user?._id;
		const user = req.user;
		if (user?._id !== userId) {
			return res.status(403).json({ error: 'You do not have permission to view these credits.' });
		}

		const credits = await creditService.getUserCredits(userId as any);

		if (!credits || credits.length === 0) {
			return res.status(404).json({ message: 'No credit transactions found for this user.' });
		}

		return res.status(200).json({ userId, credits });
	} catch (error: any) {
		return res.status(500).json({ error: 'Failed to retrieve user credits. ' + error.message });
	}
};

export const CreditController = {
	issueCredit,
	getUserCredits
};
