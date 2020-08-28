import {
    assertEquals,
} from "https://deno.land/std@0.64.0/testing/asserts.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.0-alpha2/deno-dom-wasm.ts";
import { getCheckboxId, createOption, CONTENT } from "../src/window.js";

Deno.test("should return an Id with same value as property", () => {
    const propertyName = "SomeProp";
    const option = createOption(propertyName);
    const checkboxId = getCheckboxId(option);
    assertEquals(checkboxId, propertyName);
});

Deno.test("should return an undefined Id", () => {
    const container = document.createElement("div");
    const checkboxId = getCheckboxId(container);
    assertEquals(checkboxId, undefined);
});