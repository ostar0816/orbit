import * as React from "react";
import * as Web3 from "web3";
import { DebtEntity, FilledCollateralizedDebtEntity, InvestmentEntity } from "../../models";
import { Nav, NavLink, TabContent, TabPane } from "reactstrap";
import { DebtsContainer } from "./Debts/DebtsContainer";
import { InvestmentsContainer } from "./Investments/InvestmentsContainer";
import { Wrapper, StyledNavItem, TitleFirstWord, TitleRest } from "./styledComponents";
import { Dharma } from "@dharmaprotocol/dharma.js";
const Web3Utils = require("../../utils/web3Utils");

interface Props {
    dharma: Dharma;
    accounts: string[];
    pendingDebtEntities: DebtEntity[];
    investments: InvestmentEntity[];
    handleSetError: (errorMessage: string) => void;
    handleFillDebtEntity: (issuanceHash: string) => void;
    setInvestments: (investments: InvestmentEntity[]) => void;
    web3: Web3;
    filledDebtEntities: DebtEntity[];
    handleSetFilledDebtEntities: (filledDebtEntities: DebtEntity[]) => void;
}

interface States {
    initiallyLoading: boolean;
    activeTab: string;
    currentTime?: number;
    investments: InvestmentEntity[];
}

class Dashboard extends React.Component<Props, States> {
    constructor(props: Props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            activeTab: "1",
            initiallyLoading: true,
            investments: [],
        };
    }

    async componentDidMount() {
        if (this.props.dharma) {
            await this.getDebtsAsync(this.props.dharma);
            await this.getInvestmentsAsync(this.props.dharma);
            await this.getBlockchainTime();
            this.setState({ initiallyLoading: false });
        }
    }

    async componentDidUpdate(prevProps: Props) {
        if (this.props.dharma !== prevProps.dharma) {
            await this.getDebtsAsync(this.props.dharma);
            await this.getInvestmentsAsync(this.props.dharma);
            await this.getBlockchainTime();
            this.setState({ initiallyLoading: false });
        }
    }

    async getBlockchainTime() {
        const web3Utils = new Web3Utils(this.props.web3);
        const currentTime = await web3Utils.getCurrentBlockTime();
        this.setState({ currentTime });
    }

    async getDebtsAsync(dharma: Dharma) {
        try {
            if (!dharma || !this.props.accounts || !this.props.accounts.length) {
                return;
            }
            const { accounts, pendingDebtEntities } = this.props;
            const issuanceHashes = await dharma.servicing.getDebtsAsync(accounts[0]);
            let filledDebtEntities: FilledCollateralizedDebtEntity[] = [];
            for (let issuanceHash of issuanceHashes) {
                const debtRegistryEntry = await dharma.servicing.getDebtRegistryEntry(issuanceHash);

                const adapter = await dharma.adapters.getAdapterByTermsContractAddress(
                    debtRegistryEntry.termsContract,
                );
                const dharmaDebtOrder = (await adapter.fromDebtRegistryEntry(
                    debtRegistryEntry,
                )) as any;

                const repaymentSchedule = await adapter.getRepaymentSchedule(debtRegistryEntry);
                const repaidAmount = await dharma.servicing.getValueRepaid(issuanceHash);
                const totalExpectedRepayment = await dharma.servicing.getTotalExpectedRepayment(
                    issuanceHash,
                );
                const collateralReturnable = await dharma.adapters.collateralizedSimpleInterestLoan.canReturnCollateral(
                    issuanceHash,
                );
                const collateralWithdrawn = await this.collateralWithdrawn(dharma, issuanceHash);

                const debtEntity: FilledCollateralizedDebtEntity = new FilledCollateralizedDebtEntity(
                    {
                        amortizationUnit: dharmaDebtOrder.amortizationUnit,
                        collateralAmount: dharmaDebtOrder.collateralAmount,
                        collateralReturnable,
                        collateralTokenSymbol: dharmaDebtOrder.collateralTokenSymbol,
                        collateralWithdrawn,
                        creditor: debtRegistryEntry.beneficiary,
                        debtor: accounts[0],
                        dharmaOrder: dharmaDebtOrder,
                        gracePeriodInDays: dharmaDebtOrder.gracePeriodInDays,
                        interestRate: dharmaDebtOrder.interestRate,
                        issuanceHash,
                        principalAmount: dharmaDebtOrder.principalAmount,
                        principalTokenSymbol: dharmaDebtOrder.principalTokenSymbol,
                        repaidAmount,
                        repaymentSchedule,
                        termLength: dharmaDebtOrder.termLength,
                        totalExpectedRepayment,
                    },
                );

                filledDebtEntities.push(debtEntity);
            }

            this.props.handleSetFilledDebtEntities(filledDebtEntities);

            // Check whether any of the pending debt orders is filled
            // Then, we want to remove it from the list
            if (pendingDebtEntities) {
                for (let pendingDebtEntity of pendingDebtEntities) {
                    if (issuanceHashes.indexOf(pendingDebtEntity.issuanceHash) >= 0) {
                        this.props.handleFillDebtEntity(pendingDebtEntity.issuanceHash);
                    }
                }
            }
        } catch (e) {
            this.props.handleSetError(e.message);
        }
    }

    /**
     * Returns true if the collateral (for a debt agreement associated with the given issuance
     * hash) has been returned or seized.
     *
     * @param {Dharma} dharma
     * @param {string} issuanceHash
     * @returns {Promise<boolean>}
     */
    async collateralWithdrawn(dharma: Dharma, issuanceHash: string): Promise<boolean> {
        return await dharma.adapters.collateralizedSimpleInterestLoan.isCollateralWithdrawn(
            issuanceHash,
        );
    }

    async getInvestmentsAsync(dharma: Dharma) {
        try {
            if (!dharma || !this.props.accounts || !this.props.accounts.length) {
                return;
            }

            const { accounts } = this.props;
            const issuanceHashes = await dharma.servicing.getInvestmentsAsync(accounts[0]);
            let investments: InvestmentEntity[] = [];

            for (let issuanceHash of issuanceHashes) {
                const debtRegistryEntry = await dharma.servicing.getDebtRegistryEntry(issuanceHash);

                const termsContractType = await dharma.contracts.getTermsContractType(
                    debtRegistryEntry.termsContract,
                );
                const adapter = await dharma.adapters.getAdapterByTermsContractAddress(
                    debtRegistryEntry.termsContract,
                );
                // TODO: cast dharmaDebtOrder to termsContractType, set above
                const dharmaDebtOrder = (await adapter.fromDebtRegistryEntry(
                    debtRegistryEntry,
                )) as any;
                const repaymentSchedule = await adapter.getRepaymentSchedule(debtRegistryEntry);
                const earnedAmount = await dharma.servicing.getValueRepaid(issuanceHash);

                const collateralWithdrawn = await this.collateralWithdrawn(dharma, issuanceHash);
                const status = collateralWithdrawn ? "inactive" : "active";

                const investment: InvestmentEntity = {
                    collateralWithdrawn,
                    creditor: debtRegistryEntry.beneficiary,
                    termsContract: debtRegistryEntry.termsContract,
                    termsContractParameters: debtRegistryEntry.termsContractParameters,
                    underwriter: debtRegistryEntry.underwriter,
                    underwriterRiskRating: debtRegistryEntry.underwriterRiskRating,
                    amortizationUnit: dharmaDebtOrder.amortizationUnit,
                    interestRate: dharmaDebtOrder.interestRate,
                    principalAmount: dharmaDebtOrder.principalAmount,
                    principalTokenSymbol: dharmaDebtOrder.principalTokenSymbol,
                    termLength: dharmaDebtOrder.termLength,
                    issuanceHash,
                    earnedAmount,
                    repaymentSchedule,
                    status,
                };
                if (termsContractType === "CollateralizedSimpleInterestLoan") {
                    investment.collateralAmount = dharmaDebtOrder.collateralAmount;
                    investment.collateralized = true;
                    investment.collateralTokenSymbol = dharmaDebtOrder.collateralTokenSymbol;
                    investment.gracePeriodInDays = dharmaDebtOrder.gracePeriodInDays;

                    const collateralizedAdapter = await dharma.adapters
                        .collateralizedSimpleInterestLoan;
                    const collateralSeizable = await collateralizedAdapter.canSeizeCollateral(
                        issuanceHash,
                    );

                    investment.collateralSeizable = collateralSeizable;
                }

                investments.push(investment);
            }
            this.props.setInvestments(investments);
        } catch (e) {
            // this.props.handleSetError('Unable to get investments info');
            this.props.handleSetError(e.message);
        }
    }

    toggle(tab: string) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab,
            });
        }
    }

    render() {
        const { pendingDebtEntities, filledDebtEntities } = this.props;
        if (!pendingDebtEntities || !filledDebtEntities) {
            return null;
        }

        const debtEntities: DebtEntity[] = pendingDebtEntities.concat(filledDebtEntities);

        const { activeTab, initiallyLoading, currentTime } = this.state;
        const investments = this.props.investments;

        const tabs = [
            {
                id: "1",
                titleFirstWord: "Your ",
                titleRest: "Debts (" + debtEntities.length + ")",
                content: (
                    <DebtsContainer
                        currentTime={currentTime}
                        dharma={this.props.dharma}
                        debtEntities={debtEntities}
                        initializing={initiallyLoading}
                    />
                ),
            },
            {
                id: "2",
                titleFirstWord: "Your ",
                titleRest: "Investments (" + investments.length + ")",
                content: (
                    <InvestmentsContainer
                        currentTime={currentTime}
                        investments={investments}
                        initializing={initiallyLoading}
                    />
                ),
            },
        ];
        const tabNavs = tabs.map((tab) => (
            <StyledNavItem key={tab.id}>
                <NavLink
                    className={activeTab === tab.id ? "active" : ""}
                    onClick={() => {
                        this.toggle(tab.id);
                    }}
                >
                    <TitleFirstWord>{tab.titleFirstWord}</TitleFirstWord>
                    <TitleRest>{tab.titleRest}</TitleRest>
                </NavLink>
            </StyledNavItem>
        ));
        const tabContents = tabs.map((tab) => (
            <TabPane tabId={tab.id} key={tab.id}>
                {tab.content}
            </TabPane>
        ));

        return (
            <Wrapper>
                <Nav tabs={true}>{tabNavs}</Nav>
                <TabContent activeTab={activeTab}>{tabContents}</TabContent>
            </Wrapper>
        );
    }
}

export { Dashboard };
