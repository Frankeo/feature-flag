import {
    assertEquals,
} from "https://deno.land/std@0.64.0/testing/asserts.ts";
import { getFileContent, CONTENT } from "../src/window.js";

let content;
window.chrome = {
    storage: {
        local: {
            get: (_, callback) => {
                callback(content);
            }
        }
    }
}

Deno.test("should return parsed info when exists", async () => {
    content = {[CONTENT]: '{"mockedValue":1}'};
    const result = await getFileContent();
    const expectedResult = {"mockedValue":1};
    assertEquals(result, expectedResult);
});

Deno.test("should return null when info DON'T exists", async () => {
    content = {[CONTENT]: undefined};
    const result = await getFileContent();
    assertEquals(result, null);
});

