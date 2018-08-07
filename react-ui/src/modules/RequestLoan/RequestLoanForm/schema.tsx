import { JSONSchema4 } from "json-schema";
const singleLineString = require("single-line-string");

export const schema: JSONSchema4 = {
    type: "object",
    definitions: {
        tokens: {
            type: "string",
            title: "Token",
            enum: ["REP", "MKR", "ZRX"],
            enumNames: ["Augur (REP)", "Maker DAO (MKR)", "0x Token (ZRX)"],
        },
    },
    properties: {
        debtOrderType: {
            type: "string",
            title: "Which type of loan would you like?",
            enum: ["simpleInterestLoan", "compoundInterestLoan"],
            enumNames: ["Simple Interest Loan", "Compound Interest Loan (Coming Soon)"],
            default: "simpleInterestLoan",
        },
        loan: {
            type: "object",
            title: "How much of which token would you like to borrow?",
            required: ["principalAmount", "principalTokenSymbol"],
            properties: {
                principalAmount: {
                    type: "number",
                    title: "Amount",
                },
                principalTokenSymbol: {
                    $ref: "#/definitions/tokens",
                },
                description: {
                    type: "string",
                    maxLength: 500,
                },
            },
        },
        terms: {
            type: "object",
            title: "What terms would you like?",
            required: ["interestRate", "amortizationUnit", "termLength"],
            properties: {
                interestRate: {
                    type: "number",
                    title: "Interest Rate",
                    description: singleLineString`In total, you will owe the sum of the principal plus interest.
                         Interest is calculated by multiplying the interest rate by the principal amount.`,
                },
                amortizationUnit: {
                    type: "string",
                    title: "Installments Type",
                    enum: ["hours", "days", "weeks", "months", "years"],
                    enumNames: ["Hourly", "Daily", "Weekly", "Monthly", "Yearly"],
                },
                termLength: {
                    type: "number",
                    title: "Term Length",
                    description: singleLineString`Enter the length of the entire debt agreement, in
                                                  units of the chosen installments (e.g. a term
                                                  length of 2 with an installment type of "monthly"
                                                  would be equivalent to a 2 month long loan)`,
                },
            },
        },
        collateral: {
            type: "object",
            title: "Collateralize your loan",
            required: ["collateralAmount", "collateralTokenSymbol", "gracePeriodInDays"],
            description: singleLineString`Collateral is an item of value that a borrower puts up for
                                          possible seizure in the event that they do not pay back
                                          the full value of their loan. Collateral protects lenders
                                          from borrower default by reducing the risk involved in a
                                          debt agreement. In addition, collateral helps borrowers
                                          obtain loans they might not otherwise receive given their
                                          credit history (or lack thereof).`,
            properties: {
                collateralAmount: {
                    type: "number",
                    title: "Collateral Amount",
                },
                collateralTokenSymbol: {
                    $ref: "#/definitions/tokens",
                },
                gracePeriodInDays: {
                    type: "number",
                    title: "Grace Period",
                    description: singleLineString`If a loan is in default after its term has
                                                  expired, the grace period specifies the number of
                                                  days before the collateral can be seized by
                                                  creditor.`,
                },
            },
        },
    },
    required: ["debtOrderType", "loan", "terms"],
};

export const uiSchema = {
    debtOrderType: {
        "ui:autofocus": true,
        "ui:options": {
            pressEnter: true,
        },
    },
    loan: {
        principalAmount: {
            "ui:placeholder": "100.3",
            classNames: "inline-field width65",
            "ui:options": {
                pressEnter: false,
            },
        },
        principalTokenSymbol: {
            "ui:placeholder": "Select token...",
            "ui:options": {
                label: false,
                pressEnter: false,
            },
            classNames: "inline-field width35 padding-top",
        },
        description: {
            "ui:placeholder": "Description (optional, but helpful to lenders)",
            "ui:options": {
                label: false,
                pressEnter: false,
            },
            classNames: "group-field",
        },
    },
    collateral: {
        collateralAmount: {
            "ui:placeholder": "Amount of collateral",
            "ui:options": {
                pressEnter: false,
            },
            classNames: "inline-field width65",
        },
        collateralTokenSymbol: {
            "ui:placeholder": "select",
            "ui:options": {
                label: false,
                pressEnter: false,
            },
            classNames: "inline-field width35 padding-top",
        },
        gracePeriodInDays: {
            "ui:placeholder": "Grace period (days)",
            "ui:options": {
                pressEnter: false,
            },
            classNames: "group-field",
        },
    },
    terms: {
        interestRate: {
            "ui:placeholder": "8.12%",
            classNames: "group-field",
            "ui:options": {
                pressEnter: false,
            },
        },
        amortizationUnit: {
            "ui:placeholder": "Select installments...",
            classNames: "group-field",
            "ui:options": {
                pressEnter: false,
            },
        },
        termLength: {
            "ui:placeholder": "3",
            classNames: "group-field",
            "ui:options": {
                pressEnter: false,
            },
        },
    },
};
