export function validateCreateAccount(req, res, next) {
  const { username, password, email } = req.body;
  /* validate */

  next();
}