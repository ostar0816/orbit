import * as React from "react";
import { formatDate, formatTime } from "../../../src/utils/formatDate";

describe("formatDate", () => {
    it("should output the right date format", () => {
        const testDate = formatDate(1521174018, "UTC");
        expect(testDate).toEqual("3/16/2018");
    });

    it("should output the right time format", () => {
        const testTime = formatTime(1521174018, "UTC");
        expect(testTime).toEqual("4:20:18 AM");
    });
});
