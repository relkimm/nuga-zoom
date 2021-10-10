import dotenv from 'dotenv';
dotenv.config();

/* Common */
export const ROOT_PATH = process.env.PWD;

/* Server */
export const SERVER_PORT = process.env.SERVER_PORT;

/* Logger */
export const LOG_LEVEL = process.env.LOG_LEVEL;

/* DB */
export const MONGO_URI = process.env.MONGO_URI;

/* View */
export const VIEW_ENGINE = process.env.VIEW_ENGINE;