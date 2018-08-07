import * as React from "react";
import { getIdenticonImgSrc } from "../../../src/utils/identicon";
const Identicon = require("identicon.js");

describe("identicon", () => {
    const hash = "somestringsomestring";
    let options = {
        foreground: [28, 193, 204, 255],
        background: [255, 255, 255, 255],
        margin: 0.1,
        size: 100,
        format: "svg",
    };

    it("should create an identicon image hash", () => {
        const identiconData = new Identicon(hash, options).toString();
        const imageHash = "data:image/svg+xml;base64," + identiconData;
        expect(getIdenticonImgSrc(hash)).toEqual(imageHash);
    });

    it("should create an identicon image hash with the correct size and margin", () => {
        const hash = "somestringsomestring";
        options.margin = 1;
        options.size = 200;
        const identiconData = new Identicon(hash, options).toString();
        const imageHash = "data:image/svg+xml;base64," + identiconData;
        expect(getIdenticonImgSrc(hash, 200, 1)).toEqual(imageHash);
    });

    it("should return empty string if no hash is provided", () => {
        expect(getIdenticonImgSrc("")).toEqual("");
    });
});
