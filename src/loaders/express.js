import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { ROOT_PATH, LOG_LEVEL, COOKIE_KEY, SESSION_KEY, VIEW_ENGINE } from '../config';
import mainRouter from '../routes';

export default async (app) => {
  app.set('view engine', VIEW_ENGINE);
  app.set('views', path.join(ROOT_PATH, 'src', 'views'));

  app.use(cors({ origin: 'localhost', credentials: true }));
  app.use(logger(LOG_LEVEL));
  
  app.use('/public', express.static(path.join(ROOT_PATH, 'src', 'public')));
  
  app.use(cookieParser(COOKIE_KEY));
  app.use(session({
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      signed: true,
    }
  }));
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  
  app.use(mainRouter);
  return app;
}