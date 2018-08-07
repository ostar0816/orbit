import * as React from "react";
import { encodeUrlParams, shortenString } from "../../../src/utils/webUtils";

describe("encodeUrlParams", () => {
    it("should return correct encoded params", () => {
        const params = {
            option1: "somestring",
            option2: true,
            option3: 100,
        };
        const expectedValue = "option1=somestring&option2=true&option3=100";
        expect(encodeUrlParams(params)).toEqual(expectedValue);
    });
});

describe("shortenString", () => {
    it("should return the original text if the length <= 10 chars", () => {
        expect(shortenString("somestring")).toEqual("somestring");
    });

    it("should return the shortened text if the length > 10 chars", () => {
        expect(shortenString("somelongstringvalue")).toEqual("somel...value");
    });
});
