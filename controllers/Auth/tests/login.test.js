import {
  createTokens,
  validatePassword,
  invalidUsernameOrPassword,
} from "../login.js";
describe("Create access and refresh tokens", () => {
  test("return access and refresh token", () => {
    const roles = ["ORDINARY MEMBER", "ADMIN", "TREASURER"];
    const tokens = createTokens(roles);
    //expect tokens to be an array
    //expect tokens to have exactly 2 items
    //expect the items to be strings
  });
});
describe("Password validation", () => {
  test("matching passwords", done => {
    const password = "E3xv8>.1";
    const isValidPassword = validatePassword(password, password);
    expect(isValidPassword).toBe(true);
    done();
  });
  test("Non matching passwords", done => {
    const password1 = "12312wsqsdcsd";
    const password2 = "asdsdas";
    const isValidPassowrd = validatePassword(password1, password2);
    expect(isValidPassowrd).toBe(false);
    done();
  });
});
describe("Set invalid username or password status code and message", () => {
  //how to test impure functions using Jest
});
