import express from 'express';
import { validateCreateAccount } from './validators/account';
import accountService from '../services/account';
import AccountCdo from '../models/dtos/AccountCdo';

const router = express.Router();

router.post('/', validateCreateAccount, async (req, res) => {
  const accountCdo = new AccountCdo(req.body);
  await accountService.create(accountCdo);
  return res.status(202).send();
});

export default router;
