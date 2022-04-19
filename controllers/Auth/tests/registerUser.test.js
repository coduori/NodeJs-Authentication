import { hashPassword } from "../registerUser";

describe("Hash plaintext password", () => {
  test("Parse plain text password and receive hashed password", () => {
    const password = "E3xv8>.1";
    const hashedPassword = hashPassword(password);
    console.log(hashedPassword);
    expect(hashedPassword).not.toBe(password);
  });
});
