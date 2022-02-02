import { ValidationError } from "joi";
import { CheckValidToken } from "../utils/jtwTokens";

// Test method CheckValidToken
test("token valid", () => {
  let expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() + 6000);
  const isValid = CheckValidToken(expirationDate);
  expect(isValid).toBe(true);
});

// Test method CheckValidToken
test("token invalid", () => {
  let expirationDate = new Date();
  expirationDate.setSeconds(expirationDate.getSeconds() - 60000);
  const isValid = CheckValidToken(expirationDate);
  expect(isValid).toBe(false);
});
