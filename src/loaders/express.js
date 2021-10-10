import express from 'express';
import path from 'path';
import cors from 'cors';
import logger from 'morgan';
import { ROOT_PATH, LOG_LEVEL, VIEW_ENGINE } from '../config';
import mainRouter from '../routes';


export default async (app) => {
  app.set('view engine', VIEW_ENGINE);
  app.set('views', path.join(ROOT_PATH, 'src', 'views'));
  app.use(cors({
    origin: 'localhost',
    credentials: true,
  }));
  app.use(logger(LOG_LEVEL));
  app.use('/public', express.static(path.join(ROOT_PATH, 'src', 'public')));
  app.use(express.json());
  app.use(mainRouter);
  return app;
}