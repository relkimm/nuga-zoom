import express from 'express';
import accountRouter from './account';

const router = express.Router();

router.get('/', (_, res) => res.render('home'));
router.use('/api/account', accountRouter);
router.get('/*', (_, res) => res.redirect('/'));

export default router;
