import { BigNumber } from "bignumber.js";
import { OpenCollateralizedDebtEntity } from "./DebtEntities";

/**
 * Represents the parameters we use in URLs to identify debt orders;
 * this is necesary because queryParams cannot handle nested Objects,
 * like the dharma.js DebtOrder.Instance in the DebtEntity object.
 *
 * Also, typescript does not support multiple inheritance.
 */
export class DebtQueryParams extends OpenCollateralizedDebtEntity {
    // dharma.js properties
    kernelVersion?: string;
    issuanceVersion?: string;
    principalToken?: string;
    debtorFee?: BigNumber;
    creditor?: string;
    creditorFee?: BigNumber;
    relayer?: string;
    relayerFee?: BigNumber;
    underwriter?: string;
    underwriterFee?: BigNumber;
    underwriterRiskRating?: BigNumber;
    termsContract?: string;
    termsContractParameters?: string;
    expirationTimestampInSec?: BigNumber;
    salt?: BigNumber;

    // Signatures
    debtorSignature?: object;
    creditorSignature?: object;
    underwriterSignature?: object;
}
