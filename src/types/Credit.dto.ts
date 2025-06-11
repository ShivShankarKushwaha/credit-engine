import Joi from "joi";
import { Types } from "mongoose";
export interface CreditDTO {
	userId: Types.ObjectId | string; 
	actionType: string;
	amount: number;
	metadata?: Record<string, any>;
}

export interface CreditResponseDTO {
	_id: string;
	userId: string;
	actionType: string;
	amount: number;
	metadata: Record<string, any>;
	timestamp: Date;
}

export const creditSchema = Joi.object({
    userId: Joi.string().required(),
    actionType: Joi.string().required(),
    amount: Joi.number().required(),
    metadata: Joi.object().optional(),
});
