import expressWinston from 'express-winston';
import { format, transports } from 'winston';
import * as winstonMongoDB from 'winston-mongodb';
import env from '@/env';

const customFormat = format.combine(
	format.timestamp(),
	format.printf(({ timestamp, level, message, ...metadata }) => {
		return `${timestamp} [${level.toUpperCase()}]: ${message} ${JSON.stringify(metadata.meta.req.headers)} ${JSON.stringify(metadata.meta.req.body)} ${JSON.stringify(metadata.meta.res)}`;
	})
);
const consoleFormat = format.combine(
	format.timestamp(),
	format.printf(({ timestamp, level, message, ...metadata }) => {
		return `${timestamp} [${level.toUpperCase()}]: ${message} ${JSON.stringify(metadata.meta.req.headers)} ${JSON.stringify(metadata.meta.req.body)} ${JSON.stringify(metadata.meta.res)}`;
	}),
	format.prettyPrint({ colorize: true })
);

export const logger = expressWinston.logger({
	transports:
		env.NODE_ENV === 'development'
			? [new transports.Console({ format: consoleFormat })]
			: [
					//   new transports.File({ filename: path.join(__dirname, "../../logs/warnings.log"), level: "warn" }),
					// new transports.File({filename:'logs/combined.log',level:'info'}),
					// new transports.File({filename:'logs/error.log',level:'error'}),
					// new transports.File({ filename: 'logs/warnings.log', level: 'warn' }),
					new winstonMongoDB.MongoDB({
						level: 'warn',
						db: env.MONGO_URI,
						options: { useUnifiedTopology: true },
						collection: 'logs',
						capped: true,
						cappedMax: 1024 * 1024 * 5,
						format: format.combine(format.timestamp(), format.json())
					})
				],
	statusLevels: true,
	format: customFormat,
	meta: true,
	requestWhitelist: ['headers', 'body'],
	responseWhitelist: ['body']
});
