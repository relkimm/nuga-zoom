import Account from "../models/domains/Account";
import AccountModel from '../models/account';

class AccountService {

  async create(accountCdo) {
    const account = new Account(accountCdo);
    await account.hashPassword();
    const accountModel = new AccountModel(account);
    await accountModel.save(accountModel);
  }
}

export default new AccountService();