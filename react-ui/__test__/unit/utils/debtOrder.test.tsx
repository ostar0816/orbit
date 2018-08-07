import * as React from "react";
import { amortizationUnitToFrequency } from "../../../src/utils/debtOrder";

describe("amortizationUnitToFrequency", () => {
    it("should return the right frequency: hours => Hourly", () => {
        const freq = amortizationUnitToFrequency("hours");
        expect(freq).toEqual("Hourly");
    });

    it("should return the right frequency: days => Daily", () => {
        const freq = amortizationUnitToFrequency("days");
        expect(freq).toEqual("Daily");
    });

    it("should return the right frequency: weeks => Weekly", () => {
        const freq = amortizationUnitToFrequency("weeks");
        expect(freq).toEqual("Weekly");
    });

    it("should return the right frequency: months => Monthly", () => {
        const freq = amortizationUnitToFrequency("months");
        expect(freq).toEqual("Monthly");
    });

    it("should return the right frequency: years => Yearly", () => {
        const freq = amortizationUnitToFrequency("years");
        expect(freq).toEqual("Yearly");
    });

    it('should return "" if no match', () => {
        const freq = amortizationUnitToFrequency("");
        expect(freq).toEqual("");
    });
});
