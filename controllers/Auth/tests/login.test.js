import { createTokens, validatePassword } from "../login.js";
describe("Create access and refresh tokens", () => {
  test("return access and refresh token", () => {
    const payload = {
      sub: "test test",
      roles: ["ORDINARY MEMBER", "ADMIN", "TREASURER"],
    };
    const tokens = createTokens(payload);
    expect(tokens).toBeInstanceOf(Array);
    expect(tokens).toHaveLength(2);
    expect(typeof tokens[0]).toBe("string");
    expect(typeof tokens[1]).toBe("string");
  });
});
describe("Password validation", () => {
  test("matching passwords", done => {
    const password = "E3xv8>.1";
    const hashedPassword =
      "$2b$05$8Z2PjCZj3ZK6Q5LFdAmneuJ2JLJOtJptVFHEPThjtebNEcOirEsgq";
    const isValidPassword = validatePassword(password, hashedPassword);
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
