import * as React from "react";
import { shallow } from "enzyme";
import { FillLoanEmpty } from "../../../../../src/modules/FillLoan/FillLoanEmpty";
import {
    Instructions,
    Title,
    StyledLink,
} from "../../../../../src/modules/FillLoan/FillLoanEmpty/styledComponents";
import { Header, MainWrapper, JSONSchemaForm } from "../../../../../src/components";
import { PaperLayout } from "../../../../../src/layouts";
import { encodeUrlParams } from "../../../../../src/utils";
import { browserHistory } from "react-router";

describe("<FillLoanEmpty />", () => {
    describe("#render", () => {
        let wrapper;
        beforeEach(() => {
            wrapper = shallow(<FillLoanEmpty />);
        });

        it("should render successfully", () => {
            expect(wrapper.length).toEqual(1);
        });

        it("should render a <Header />", () => {
            expect(
                wrapper
                    .find(PaperLayout)
                    .find(MainWrapper)
                    .find(Header).length,
            ).toEqual(1);
        });

        it("should render a <JSONSchemaForm />", () => {
            expect(
                wrapper
                    .find(PaperLayout)
                    .find(MainWrapper)
                    .find(JSONSchemaForm).length,
            ).toEqual(1);
        });

        describe("<Instructions />", () => {
            let instructions;
            beforeEach(() => {
                instructions = wrapper
                    .find(PaperLayout)
                    .find(MainWrapper)
                    .find(Instructions);
            });

            it("should render", () => {
                expect(instructions.length).toEqual(1);
            });

            it("should render a <Title />", () => {
                expect(instructions.find(Title).length).toEqual(1);
            });

            it("should render a <StyledLink />", () => {
                expect(instructions.find(StyledLink).length).toEqual(1);
            });
        });
    });

    describe("#handleChange", () => {
        it("should call setState", () => {
            const spy = jest.spyOn(FillLoanEmpty.prototype, "setState");
            const wrapper = shallow(<FillLoanEmpty />);
            const formData = {};
            wrapper.instance().handleChange(formData);
            expect(spy).toHaveBeenCalledWith({ formData });
        });
    });

    describe("#handleSubmit", () => {
        it("should not call browserHistory if no loanRequest", () => {
            const spy = jest.spyOn(browserHistory, "push");
            const wrapper = shallow(<FillLoanEmpty />);
            const formData = {
                loan: {
                    loanRequest: null,
                },
            };
            wrapper.instance().handleChange(formData);
            wrapper.instance().handleSubmit();
            expect(spy).not.toHaveBeenCalled();
        });

        it("should call browserHistory if there is loanRequest", () => {
            const spy = jest.spyOn(browserHistory, "push");
            const wrapper = shallow(<FillLoanEmpty />);
            const formData = {
                loan: {
                    loanRequest: JSON.stringify({
                        principalAmount: 10,
                        principalToken: "sometokenaddress",
                        termsContract: "sometermscontract",
                        termsContractParameters: "sometermscontractparams",
                        debtorSignature: "somedebtorsignature",
                        debtor: "somedebtor",
                        description: "somedescription",
                        principalTokenSymbol: "someprincipaltokensymbol",
                    }),
                },
            };
            wrapper.instance().handleChange(formData);
            wrapper.instance().handleSubmit();
            const urlParams = {
                principalAmount: 10,
                principalToken: "sometokenaddress",
                termsContract: "sometermscontract",
                termsContractParameters: "sometermscontractparams",
                debtorSignature: "somedebtorsignature",
                debtor: "somedebtor",
                description: "somedescription",
                principalTokenSymbol: "someprincipaltokensymbol",
            };
            expect(spy).toHaveBeenCalledWith("/fill/loan?" + encodeUrlParams(urlParams));
        });
    });
});
