import express from 'express';
import path from 'path';
import logger from 'morgan';
import { ROOT_PATH } from '../config';
import { LOG_LEVEL } from '../config';
import mainRouter from '../routes';


export default async (app) => {
  app.set('view engine', 'pug');
  app.set('views', path.join(ROOT_PATH, 'src', 'views'));
  app.use(logger(LOG_LEVEL));
  app.use('/public', express.static(path.join(ROOT_PATH, 'src', 'public')));
  app.use(mainRouter);
  return app;
}