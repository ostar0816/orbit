import * as React from "react";
import { Header, MainWrapper, JSONSchemaForm } from "../../../components";
import { schema, uiSchema, validDebtOrderSchema } from "./schema";
import { PaperLayout } from "../../../layouts";
import { Instructions, Title, StyledLink } from "./styledComponents";
import { Analytics, debtOrderFromJSON, encodeUrlParams } from "../../../utils";
import { browserHistory } from "react-router";

interface State {
    formData: any;
}

class FillLoanEmpty extends React.Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            formData: {},
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validateForm = this.validateForm.bind(this);

        Analytics.track(Analytics.FillLoanAction.ViewForm, {
            category: Analytics.Category.FillLoan,
            nonInteraction: 1,
        });
    }

    handleChange(formData: any) {
        this.setState({ formData });
    }

    handleSubmit() {
        let loanRequest = this.state.formData.loan.loanRequest;
        if (!loanRequest) {
            return;
        }

        Analytics.track(Analytics.FillLoanAction.SubmitJson, {
            category: Analytics.Category.FillLoan,
        });

        loanRequest = JSON.parse(loanRequest);
        browserHistory.push(`/fill/loan?${encodeUrlParams(loanRequest)}`);
    }

    validateForm(formData: any, errors: any) {
        let errorFound = false;

        try {
            const loanRequest = debtOrderFromJSON(formData.loan.loanRequest);
            for (let field of validDebtOrderSchema.required) {
                if (!loanRequest.hasOwnProperty(field)) {
                    errors.loan.loanRequest.addError(`JSON string is missing ${field} key.`);

                    errorFound = true;
                }
            }
        } catch (e) {
            errors.loan.loanRequest.addError("Invalid JSON string.");

            errorFound = true;
        }

        if (errorFound) {
            Analytics.track(Analytics.FillLoanAction.JsonError, {
                category: Analytics.Category.FillLoan,
            });
        }

        return errors;
    }

    render() {
        const descriptionContent = (
            <span>
                Input a loan's JSON string to review the borrower's proposed terms and decide
                whether or not you'd like to fill this <b>Open Debt Order</b>
            </span>
        );

        return (
            <PaperLayout>
                <MainWrapper>
                    <Header title={"Fill a Loan"} description={descriptionContent} />
                    <JSONSchemaForm
                        schema={schema}
                        uiSchema={uiSchema}
                        formData={this.state.formData}
                        buttonText="Next &#8594;"
                        onHandleChange={this.handleChange}
                        onHandleSubmit={this.handleSubmit}
                        validate={this.validateForm}
                    />
                    <Instructions>
                        <Title>Just getting started?</Title>
                        {/*<StyledLink to="#" >FILLING DEBT ORDERS (VIDEO)</StyledLink>*/}
                        <StyledLink to="https://t.me/orbitnetwork">JOIN THE ORBIT CHAT</StyledLink>
                    </Instructions>
                </MainWrapper>
            </PaperLayout>
        );
    }
}

export { FillLoanEmpty };
