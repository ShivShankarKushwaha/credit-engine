import { Schema, model, Document } from 'mongoose';
import { CreditDTO } from '../types';
import {ActionTypes} from './ActionTypes';

export interface ICredit extends CreditDTO, Document {
	timestamp: Date;
}

const CreditSchema = new Schema<ICredit>(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			index: true
		},
		actionType: {
			type: String,
			required: true,
			enum: Object.values(ActionTypes)
		},
		amount: {
			type: Number,
			required: true,
			min: 0
		},
		metadata: {
			type: Schema.Types.Mixed,
			default: {}
		},
		timestamp: {
			type: Date,
			default: Date.now,
			index: true
		}
	},
	{
		collection: 'credits',
		timestamps: false,
		versionKey: false
	}
);

export const Credit = model<ICredit>('Credit', CreditSchema);
