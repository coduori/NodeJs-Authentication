import { body, validationResult } from "express-validator";

const registerValidation = [
  body("email", "invalid email pattern").trim().isEmail(),
  body("password", "weak password")
    .isStrongPassword({
      minLength: 8,
      minLowercase: 1,
      minSymbols: 1,
      minUppercase: 1,
      minNumbers: 1,
    })
    .withMessage(
      "password must contain atleast 8 characters including a lowercase and uppercase letters, a number, and a symbol"
    ),
  body("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("firstName cannot be empty!")
    .toUpperCase(),
  body("surname")
    .trim()
    .not()
    .isEmpty()
    .withMessage("surname cannot be empty!")
    .toUpperCase(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors);
    }
    next();
  },
];
export default registerValidation;
