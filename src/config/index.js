import dotenv from 'dotenv';
dotenv.config();

/* Common */
export const ROOT_PATH = process.env.PWD;

/* Server */
export const SERVER_PORT = process.env.SERVER_PORT;

/* Logger */
export const LOG_LEVEL = process.env.LOG_LEVEL;

/* DB */
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USERNAME = process.env.DB_USERNAME;
export const DB_PASSPORT = process.env.DB_PASSPORT;