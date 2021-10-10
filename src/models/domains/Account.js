import bcrypt from 'bcrypt';

export default class Account {
  constructor({ username, password, email }) {
    this.username = username;
    this.password = password;
    this.email = email;
  }

  async hashPassword() {
    const hashedPassword = await bcrypt.hash(this.password, 12);
    console.log('hashedPassword : ', hashedPassword);
    this.password = hashedPassword;
  }
}