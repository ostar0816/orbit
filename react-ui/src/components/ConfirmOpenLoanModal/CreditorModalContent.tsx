import * as React from "react";
import { ModalHeader, ModalBody } from "reactstrap";
const singleLineString = require("single-line-string");

import { ModalContentProps } from "./ConfirmOpenLoanModal";
import { StyledModalHeader, StyledModalBody, StyledModalBodyBoldBlue } from "./styledComponents";

const CreditorModalContent: React.SFC<ModalContentProps> = (props) => {
    const {
        amortizationUnit,
        perPaymentTokenAmount,
        perPaymentUsdAmount,
        principalTokenAmount,
        principalUsdAmount,
        termLength,
    } = props;

    return (
        <div>
            <ModalHeader>
                <StyledModalHeader>
                    {singleLineString`The borrower requests ${principalTokenAmount.toString()}
                (${principalUsdAmount.toFormat(2)} USD*)`}
                </StyledModalHeader>
            </ModalHeader>
            <ModalBody>
                <StyledModalBody>
                    {singleLineString`In return, they're promising to make repayments of `}{" "}
                    <StyledModalBodyBoldBlue>
                        {singleLineString` ${perPaymentTokenAmount.toString()} (${perPaymentUsdAmount.toFormat(
                            2,
                        )} USD*) `}{" "}
                    </StyledModalBodyBoldBlue>
                    {singleLineString` per ${amortizationUnit.slice(0, -1)} for`}{" "}
                    <StyledModalBodyBoldBlue>
                        {`${termLength.toNumber()} ${amortizationUnit}.`}
                    </StyledModalBodyBoldBlue>
                </StyledModalBody>
            </ModalBody>
        </div>
    );
};

export { CreditorModalContent };
