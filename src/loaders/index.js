import expressLoader from './express';
import mongooseLoader from './mongoose';
import passportLoader from './passport';

export default async (app) => {
  await mongooseLoader();
  await expressLoader(app);
  await passportLoader();
}