export function validateCreateAccount(req, res, next) {
  const { username, password, email } = req.body;
  console.log('validate create account start');
  console.log('username : ', username);
  console.log('password : ', password);
  console.log('email : ', email);
  /* validate */

  next();
}