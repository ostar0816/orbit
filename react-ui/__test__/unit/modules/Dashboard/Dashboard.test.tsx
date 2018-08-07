import * as React from "react";
import { shallow } from "enzyme";
import { Dashboard } from "src/modules/Dashboard/Dashboard";
import { DebtsContainer } from "src/modules/Dashboard/Debts/DebtsContainer";
import { InvestmentsContainer } from "src/modules/Dashboard/Investments/InvestmentsContainer";
import { Nav, NavLink, TabPane, TabContent } from "reactstrap";
import { StyledNavItem, TitleFirstWord, TitleRest } from "src/modules/Dashboard/styledComponents";
import MockDharma from "__mocks__/dharma.js";

describe("<Dashboard />", () => {
    describe("#render", () => {
        let wrapper;
        const props = {
            dharma: new MockDharma(),
            accounts: [],
            filledDebtEntities: [],
            investments: [],
            pendingDebtEntities: [],
            handleSetError: jest.fn(),
            handleSetFilledDebtEntities: jest.fn(),
            handleFilledDebtEntity: jest.fn(),
        };
        beforeEach(() => {
            wrapper = shallow(<Dashboard {...props} />);
        });

        it("should render the component", () => {
            expect(wrapper.length).toEqual(1);
        });

        it("should render 2 <StyledNavItem />", () => {
            expect(wrapper.find(Nav).find(StyledNavItem).length).toEqual(2);
        });

        it("should render the correct title", () => {
            expect(
                wrapper
                    .find(Nav)
                    .find(StyledNavItem)
                    .first()
                    .find(TitleFirstWord)
                    .get(0).props.children,
            ).toEqual("Your ");
            expect(
                wrapper
                    .find(Nav)
                    .find(StyledNavItem)
                    .first()
                    .find(TitleRest)
                    .get(0).props.children,
            ).toEqual("Debts (0)");
            expect(
                wrapper
                    .find(Nav)
                    .find(StyledNavItem)
                    .last()
                    .find(TitleFirstWord)
                    .get(0).props.children,
            ).toEqual("Your ");
            expect(
                wrapper
                    .find(Nav)
                    .find(StyledNavItem)
                    .last()
                    .find(TitleRest)
                    .get(0).props.children,
            ).toEqual("Investments (0)");
        });

        it("should render a <TabContent />", () => {
            expect(wrapper.find(TabContent).length).toEqual(1);
        });

        it("should render 2 <TabPane />", () => {
            expect(wrapper.find(TabContent).find(TabPane).length).toEqual(2);
        });

        it("should render a <DebtsContainer />", () => {
            expect(
                wrapper
                    .find(TabContent)
                    .find(TabPane)
                    .first()
                    .find(DebtsContainer).length,
            ).toEqual(1);
        });

        it("should render an <InvestmentsContainer />", () => {
            expect(
                wrapper
                    .find(TabContent)
                    .find(TabPane)
                    .last()
                    .find(InvestmentsContainer).length,
            ).toEqual(1);
        });
    });

    describe("#toggle", () => {
        it("should call toggle when <NavLink /> is clicked", () => {
            const props = {
                dharma: new MockDharma(),
                accounts: [],
                filledDebtEntities: [],
                investments: [],
                pendingDebtEntities: [],
                handleSetError: jest.fn(),
                handleSetFilledDebtEntities: jest.fn(),
                handleFilledDebtEntity: jest.fn(),
            };
            const spy = jest.spyOn(Dashboard.prototype, "toggle");
            const wrapper = shallow(<Dashboard {...props} />);
            wrapper
                .find(NavLink)
                .first()
                .simulate("click");
            expect(spy).toHaveBeenCalledWith("1");
            wrapper
                .find(NavLink)
                .last()
                .simulate("click");
            expect(spy).toHaveBeenCalledWith("2");
        });

        it("toggle should call set the correct state", () => {
            const props = {
                dharma: new MockDharma(),
                accounts: [],
                filledDebtEntities: [],
                investments: [],
                pendingDebtEntities: [],
                handleSetError: jest.fn(),
                handleSetFilledDebtEntities: jest.fn(),
                handleFilledDebtEntity: jest.fn(),
            };
            const spy = jest.spyOn(Dashboard.prototype, "setState");
            const wrapper = shallow(<Dashboard {...props} />);
            wrapper
                .find(NavLink)
                .first()
                .simulate("click");
            expect(spy).not.toHaveBeenCalled();
            wrapper
                .find(NavLink)
                .last()
                .simulate("click");
            expect(spy).toHaveBeenCalledWith({ activeTab: "2" });
        });
    });
});
