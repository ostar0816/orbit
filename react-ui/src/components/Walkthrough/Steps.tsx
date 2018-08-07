const singleLineString = require("single-line-string");

export const steps = [
    {
        target: ".TradingPermissionsContainer",
        content: singleLineString`To borrow and lend a specific type of token, turn on token permissions.`,
        disableBeacon: true,
        placement: "right",
        styles: {
            options: {
                zIndex: 10000,
            },
        },
    },
];
