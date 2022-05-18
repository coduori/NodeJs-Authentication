import { body, validationResult } from "express-validator";

const loginValidation = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("email field cannot be empty")
    .trim()
    .isEmail()
    .withMessage("email field must be a valid email address."),
  body("password", "pasword field cannot be blank").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send(errors);
    }
    next();
  },
];
export default loginValidation;
