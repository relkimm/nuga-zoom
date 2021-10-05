import express from 'express';
import path from 'path';
import router from '../routes';

const ROOT_PATH = process.env.PWD;

export default async (app) => {
  app.set('view engine', 'pug');
  app.set('views', path.join(ROOT_PATH, 'src', 'views'));
  app.use('/public', express.static(path.join(ROOT_PATH, 'src', 'public')));
  app.use(router);
  return app;
}