import express from 'express';
import accountRouter from './account';
import channelRouter from './channel';

const router = express.Router();

router.get('/', (_, res) => res.render('home'));
router.use('/api/account', accountRouter);
router.use('/api/channel', channelRouter);
router.get('/*', (_, res) => res.redirect('/'));

export default router;
