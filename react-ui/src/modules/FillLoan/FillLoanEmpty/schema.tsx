import { JSONSchema4 } from "json-schema";

export const schema: JSONSchema4 = {
    type: "object",
    properties: {
        loan: {
            type: "object",
            title: "Paste the requester's loan request here",
            required: ["loanRequest"],
            properties: {
                loanRequest: {
                    type: "string",
                },
            },
        },
    },
};

export const uiSchema = {
    loan: {
        loanRequest: {
            "ui:autofocus": true,
            "ui:placeholder": "Request JSON",
            "ui:widget": "textarea",
            "ui:options": {
                label: false,
                pressEnter: false,
            },
        },
    },
};

export const validDebtOrderSchema = {
    required: [
        "kernelVersion",
        "issuanceVersion",
        "principalAmount",
        "principalToken",
        "debtor",
        "debtorFee",
        "creditor",
        "creditorFee",
        "relayer",
        "relayerFee",
        "underwriter",
        "underwriterFee",
        "underwriterRiskRating",
        "termsContract",
        "termsContractParameters",
        "expirationTimestampInSec",
        "salt",
        "debtorSignature",
        "creditorSignature",
        "underwriterSignature",
        "description",
        "principalTokenSymbol",
    ],
};
