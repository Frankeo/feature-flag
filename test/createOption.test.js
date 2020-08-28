import {
    assertEquals,
} from "https://deno.land/std@0.64.0/testing/asserts.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.0-alpha2/deno-dom-wasm.ts";
import { createOption } from "../src/window.js";

const htmlWindowBody = `<input type="file" id="file" accept=".json"><div id="switches"></div>`;
window.document = new DOMParser().parseFromString(htmlWindowBody, "text/html");

Deno.test("create an option and check label content is equal to property", () => {
    const property = "SomePropertyName";
    const container = createOption(property);
    const labelNode = container.childNodes[0];
    assertEquals(labelNode.textContent, property);
});

Deno.test("create an option that should be checked", () => {
    const property = "SomePropertyName";
    const container = createOption(property, true);
    const switchNode = container.childNodes[1];
    const checkboxNode = switchNode.childNodes[0];
    assertEquals(checkboxNode.checked, true);
});

Deno.test("create an option with default value not checked(undefined)", () => {
    const property = "SomePropertyName";
    const container = createOption(property);
    const switchNode = container.childNodes[1];
    const checkboxNode = switchNode.childNodes[0];
    assertEquals(checkboxNode.checked, undefined);
});

Deno.test("create an option with a checkbox with same Id as property", () => {
    const property = "SomePropertyName";
    const container = createOption(property);
    const switchNode = container.childNodes[1];
    const checkboxNode = switchNode.childNodes[0];
    assertEquals(checkboxNode.id, property);
});