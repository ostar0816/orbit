import { BigNumber } from "bignumber.js";
import { Types } from "@dharmaprotocol/dharma.js";
import { DebtQueryParams, OpenCollateralizedDebtEntity, DebtEntity } from "../models";

export const amortizationUnitToFrequency = (unit: string) => {
    let frequency: string = "";
    switch (unit) {
        case "hours":
            frequency = "Hourly";
            break;
        case "days":
            frequency = "Daily";
            break;
        case "weeks":
            frequency = "Weekly";
            break;
        case "months":
            frequency = "Monthly";
            break;
        case "years":
            frequency = "Yearly";
            break;
        default:
            break;
    }
    return frequency;
};

export const normalizeDebtOrder = (debtOrder: Types.DebtOrder) => {
    const _debtOrder = {
        ...debtOrder,
        principalAmount: debtOrder!.principalAmount!.toNumber(),
        debtorFee: debtOrder!.debtorFee!.toNumber(),
        creditorFee: debtOrder!.creditorFee!.toNumber(),
        relayerFee: debtOrder!.relayerFee!.toNumber(),
        underwriterFee: debtOrder!.underwriterFee!.toNumber(),
        underwriterRiskRating: debtOrder!.underwriterRiskRating!.toNumber(),
        expirationTimestampInSec: debtOrder!.expirationTimestampInSec!.toNumber(),
        salt: debtOrder!.salt!.toNumber(),
        debtorSignature: JSON.stringify(debtOrder.debtorSignature),
        creditorSignature: JSON.stringify(debtOrder.creditorSignature),
        underwriterSignature: JSON.stringify(debtOrder.underwriterSignature),
    };
    return _debtOrder;
};

export const normalize = (debtOrder: any) => {
    const normalizedDebtOrder = {};

    Object.keys(debtOrder).map((key: string, index: number) => {
        const value = debtOrder[key];

        if (value.isBigNumber) {
            normalizedDebtOrder[key] = value.toNumber();

            // Check for numbers, but skip hexadedimals
        } else if (parseInt(value, 16).toString(16) === value && !isNaN(Number(value))) {
            normalizedDebtOrder[key] = Number(value);
        } else if (typeof value === "object") {
            normalizedDebtOrder[key] = JSON.stringify(value);
        } else {
            normalizedDebtOrder[key] = value;
        }
    });

    return normalizedDebtOrder;
};

export const debtOrderFromJSON = (debtOrderJSON: string) => {
    const debtOrder = JSON.parse(debtOrderJSON);
    if (debtOrder.collateralAmount && !debtOrder.collateralAmount.isBigNumber) {
        debtOrder.collateralAmount = new BigNumber(debtOrder.collateralAmount);
    }
    if (debtOrder.principalAmount && !debtOrder.principalAmount.isBigNumber) {
        debtOrder.principalAmount = new BigNumber(debtOrder.principalAmount);
    }
    if (debtOrder.debtorFee && !debtOrder.debtorFee.isBigNumber) {
        debtOrder.debtorFee = new BigNumber(debtOrder.debtorFee);
    }
    if (debtOrder.creditorFee && !debtOrder.creditorFee.isBigNumber) {
        debtOrder.creditorFee = new BigNumber(debtOrder.creditorFee);
    }
    if (debtOrder.relayerFee && !debtOrder.relayerFee.isBigNumber) {
        debtOrder.relayerFee = new BigNumber(debtOrder.relayerFee);
    }
    if (debtOrder.underwriterFee && !debtOrder.underwriterFee.isBigNumber) {
        debtOrder.underwriterFee = new BigNumber(debtOrder.underwriterFee);
    }
    if (debtOrder.underwriterRiskRating && !debtOrder.underwriterRiskRating.isBigNumber) {
        debtOrder.underwriterRiskRating = new BigNumber(debtOrder.underwriterRiskRating);
    }
    if (debtOrder.expirationTimestampInSec && !debtOrder.expirationTimestampInSec.isBigNumber) {
        debtOrder.expirationTimestampInSec = new BigNumber(debtOrder.expirationTimestampInSec);
    }
    if (debtOrder.gracePeriodInDays && !debtOrder.gracePeriodInDays.isBigNumber) {
        debtOrder.gracePeriodInDays = new BigNumber(debtOrder.gracePeriodInDays);
    }
    if (debtOrder.salt && !debtOrder.salt.isBigNumber) {
        debtOrder.salt = new BigNumber(debtOrder.salt);
    }
    if (debtOrder.termLength && !debtOrder.termLength.isBigNumber) {
        debtOrder.termLength = new BigNumber(debtOrder.termLength);
    }
    if (debtOrder.interestRate && !debtOrder.interestRate.isBigNumber) {
        debtOrder.interestRate = new BigNumber(debtOrder.interestRate);
    }
    if (debtOrder.repaidAmount && !debtOrder.repaidAmount.isBigNumber) {
        debtOrder.repaidAmount = new BigNumber(debtOrder.repaidAmount);
    }
    if (typeof debtOrder.debtorSignature === "string") {
        debtOrder.debtorSignature = JSON.parse(debtOrder.debtorSignature);
    }
    if (typeof debtOrder.creditorSignature === "string") {
        debtOrder.creditorSignature = JSON.parse(debtOrder.creditorSignature);
    }
    if (typeof debtOrder.underwriterSignature === "string") {
        debtOrder.underwriterSignature = JSON.parse(debtOrder.underwriterSignature);
    }
    return debtOrder;
};

/**
 * Given an OpenCollateralizedDebtOrder, returns normalized DebtQueryParams
 * to be used as queryParams in a URL.
 *
 * @param {OpenCollateralizedDebtEntity} debtEntity
 * @returns {any}
 */
export const generateDebtQueryParams = (debtEntity: OpenCollateralizedDebtEntity): any => {
    const { dharmaOrder, ...filteredDebtEntity } = debtEntity;
    const { principalAmount, ...filteredDharmaOrder } = dharmaOrder as any;

    const debtQueryParams: DebtQueryParams = {
        ...filteredDebtEntity,
        ...filteredDharmaOrder,
    };

    return normalize(debtQueryParams);
};

export const debtOrderFromServerEntity = (debt: DebtEntity): DebtEntity => {
    const { dharmaOrder, ...restDebt } = debt;

    const normalized = debtOrderFromJSON(JSON.stringify(restDebt));
    const normalizedDharmaOrder = debtOrderFromJSON(JSON.stringify(dharmaOrder));

    return new DebtEntity({
        ...normalized,
        dharmaOrder: normalizedDharmaOrder,
    });
};
