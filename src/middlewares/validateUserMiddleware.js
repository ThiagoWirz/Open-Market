import userSchema from "../schemas/userSchema.js";

export function validateUserMiddleware(req, res, next) {
  const user = req.body;

  const validation = userSchema.validate(user);
  if (validation.error) {
    res.sendStatus(422);
    return;
  }

  next();
}
