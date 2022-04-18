import { validateEmail, validatePassword, hashPassword } from "../registerUser";

describe("Email validation", () => {
  test("valid email", done => {
    const email = "test@email.com";
    const isValidEmail = validateEmail(email);
    expect(isValidEmail).toBe(true);
    done();
  });
  test("email without @", done => {
    const email = "test-email.com";
    const isValidEmail = validateEmail(email);
    expect(isValidEmail).toBe(false);
    done();
  });
  test("missing email", done => {
    const email = null;
    const isValidEmail = validateEmail(email);
    expect(isValidEmail).toBe(false);
    done();
  });
  test("email without suffix", done => {
    const email = "test@email";
    const isValidEmail = validateEmail(email);
    expect(isValidEmail).toBe(false);
    done();
  });
  test("email without @", done => {
    const email = "test.com";
    const isValidEmail = validateEmail(email);
    expect(isValidEmail).toBe(false);
    done();
  });
});
describe("Password validation", () => {
  test("missing password", done => {
    const password = null;
    const isValidPassword = validatePassword(password);
    expect(isValidPassword).toBe(false);
    done();
  });
  test("password less than 6 characters", done => {
    const password = "1234";
    const isValidPassword = validatePassword(password);
    expect(isValidPassword).toBe(false);
    done();
  });
});
describe("Hash plaintext password", () => {
  test("Parse plain text password and receive hashed password", () => {
    const password = "12345678";
    const hashedPassword = hashPassword(password);
    expect(hashedPassword).not.toBe(password);
  });
});
