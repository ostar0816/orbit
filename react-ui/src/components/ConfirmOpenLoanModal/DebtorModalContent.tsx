import * as React from "react";
import { ModalHeader, ModalBody } from "reactstrap";
const singleLineString = require("single-line-string");

import { ModalContentProps } from "./ConfirmOpenLoanModal";
import { StyledModalHeader, StyledModalBody, StyledModalBodyBoldBlue } from "./styledComponents";

const DebtorModalContent: React.SFC<ModalContentProps> = (props) => {
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
                    {singleLineString`You are requesting ${principalTokenAmount.toString()}
                (${principalUsdAmount.toFormat(2)} USD*)`}
                </StyledModalHeader>
            </ModalHeader>
            <ModalBody>
                <StyledModalBody>
                    {singleLineString`In return, you're promising to make repayments of `}{" "}
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

export { DebtorModalContent };
