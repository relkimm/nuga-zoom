import express from 'express';

const router = express.Router();
router.get('/', (_, res) => res.render('home'));
router.get('/*', (_, res) => res.redirect('/'));

export default router;
