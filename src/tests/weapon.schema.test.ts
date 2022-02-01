import { createWeaponSchema } from "../schema/weapon.schema";
import { createWeaponTypeSchema } from "../schema/weaponType.schema";
import { ValidationError } from "joi";
/**
 * TEst schema required:
 * name
 * description
 * price
 * attack
 * isOneHand
 * weaponTypeId
 *
 */

test("name should be required", () => {
  function creatingWeapon() {
    createWeaponTypeSchema.validate({ description: "" });
  }
  expect(creatingWeapon).toThrowError(ValidationError);
});
