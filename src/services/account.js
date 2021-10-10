import Account from "../models/domains/Account";

class AccountService {

  async create(accountCdo) {
    const account = new Account(accountCdo);
    await account.hashPassword();
  }
}

export default new AccountService();