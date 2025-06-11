import  { Credit, ICredit } from '@/models/Credit';
import {ActionTypes} from '@/models';

// implemented bonus for different - different action types
 const issueCredit = async (userId: string, actionType: string, amount: number, metadata?: Record<string, any>): Promise<ICredit> => {
	try {
		let finalAmount = amount;
        switch (actionType) {
            case ActionTypes.REFERRAL:
                finalAmount = amount * 1.5;
                break;
            case ActionTypes.COFFEE_BUY:
                finalAmount = amount * 0.1;
                break;
            case ActionTypes.TECH_MODULE:
                finalAmount = amount;
                break;
            case ActionTypes.SOCIAL_POST:
                finalAmount = amount;
                break;
            case ActionTypes.SPEND_MULTIPLIER:
                finalAmount = amount * 2;
                break;
            case ActionTypes.EVENT_ATTENDANCE:
                finalAmount = amount * 1.2;
                break;
            case ActionTypes.SURVEY_COMPLETION:
                finalAmount = amount * 1.3;
                break;
            case ActionTypes.CONTENT_CONTRIBUTION:
                finalAmount = amount * 1.4;
                break;
            default:
                finalAmount = amount;
        }

		const newCredit = new Credit({
			userId,
			actionType,
			amount: finalAmount,
			metadata: metadata || {}
		});

		await newCredit.save();
		return newCredit;
	} catch (error: any) {
		throw new Error('Failed to issue credit. ' + error?.message);
	}
};

 const getUserCredits = async (userId: string): Promise<ICredit[]> => {
	try {
        const credits = await Credit.find({ userId })
            .sort({ timestamp: -1 })
            .populate({ path: 'userId', select: 'name email' });
        return credits;
	} catch (error: any) {
		throw new Error('Failed to retrieve user credits. ' + error?.message);
	}
};

export const creditService = {
    issueCredit,
    getUserCredits
};
