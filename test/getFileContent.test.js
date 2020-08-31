import {
    assertEquals,
} from "https://deno.land/std@0.64.0/testing/asserts.ts";
import { getFileContentFromStorage } from "../src/logic/content-management.js";
import { CONTENT } from '../src/constants.js';

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
    const result = await getFileContentFromStorage();
    const expectedResult = {"mockedValue":1};
    assertEquals(result, expectedResult);
});

Deno.test("should return null when info DON'T exists", async () => {
    content = {[CONTENT]: undefined};
    const result = await getFileContentFromStorage();
    assertEquals(result, null);
});

