import {
  assertEquals,
} from "https://deno.land/std@0.64.0/testing/asserts.ts";
import { getCheckboxId } from "../src/utils.js";
import { renderOption } from "../src/logic/render.js";

Deno.test("should return an Id with same value as property", () => {
  const propertyName = "SomeProp";
  const option = renderOption(propertyName);
  const checkboxId = getCheckboxId(option);
  assertEquals(checkboxId, propertyName);
});

Deno.test("should return an undefined Id", () => {
  const container = document.createElement("div");
  const checkboxId = getCheckboxId(container);
  assertEquals(checkboxId, undefined);
});
