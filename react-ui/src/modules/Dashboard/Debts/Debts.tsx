import * as React from "react";
import {
    DebtEntity,
    FilledCollateralizedDebtEntity,
    FilledDebtEntity,
    OpenDebtEntity,
} from "../../../models";
import { Header, MainWrapper } from "../../../components";
import { DebtsMetricsContainer } from "./DebtsMetrics/DebtsMetricsContainer";
import { ActiveDebtOrderContainer } from "./ActiveDebtOrder/ActiveDebtOrderContainer";
import { DebtOrderHistory } from "./DebtOrderHistory";
import { Dharma } from "@dharmaprotocol/dharma.js";
import { BarLoader } from "react-spinners";

interface Props {
    currentTime?: number;
    debtEntities: DebtEntity[];
    dharma: Dharma;
    initializing: boolean;
}

interface State {
    allDebtEntities: DebtEntity[];
    activeDebtEntities: DebtEntity[];
    inactiveDebtEntities: FilledDebtEntity[];
}

class Debts extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allDebtEntities: [],
            activeDebtEntities: [],
            inactiveDebtEntities: [],
        };
    }

    componentDidMount() {
        this.getDebtEntitiesDetails(this.props.debtEntities);
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.debtEntities !== prevProps.debtEntities) {
            this.getDebtEntitiesDetails(this.props.debtEntities);
        }
    }

    getDebtEntitiesDetails(debtEntities: DebtEntity[]) {
        if (!debtEntities) {
            return;
        }
        const allDebtEntities: DebtEntity[] = [];
        const activeDebtEntities: DebtEntity[] = [];
        const inactiveDebtEntities: FilledDebtEntity[] = [];
        for (let debtEntity of debtEntities) {
            if (
                debtEntity instanceof OpenDebtEntity ||
                (debtEntity instanceof FilledCollateralizedDebtEntity &&
                    debtEntity.repaidAmount.lt(debtEntity.totalExpectedRepayment) &&
                    !debtEntity.collateralWithdrawn) ||
                (debtEntity instanceof FilledCollateralizedDebtEntity &&
                    debtEntity.collateralReturnable)
            ) {
                activeDebtEntities.push(debtEntity);
            } else {
                inactiveDebtEntities.push(debtEntity as FilledDebtEntity);
            }
            allDebtEntities.push(debtEntity);
        }
        this.setState({
            allDebtEntities,
            activeDebtEntities,
            inactiveDebtEntities,
        });
    }

    render() {
        const { allDebtEntities, activeDebtEntities, inactiveDebtEntities } = this.state;

        if (this.props.initializing || this.props.currentTime === undefined) {
            return (
                <MainWrapper>
                    <Header title="Your Debts" />
                    <BarLoader width={200} height={10} color={"#1cc1cc"} loading={true} />
                </MainWrapper>
            );
        } else {
            return (
                <MainWrapper>
                    <Header title="Your Debts" />
                    <DebtsMetricsContainer debtEntities={allDebtEntities} />
                    {activeDebtEntities.map((debtEntity) => (
                        <ActiveDebtOrderContainer
                            currentTime={this.props.currentTime}
                            dharma={this.props.dharma}
                            debtEntity={debtEntity}
                            key={debtEntity.issuanceHash}
                        />
                    ))}
                    <DebtOrderHistory debtEntities={inactiveDebtEntities} />
                </MainWrapper>
            );
        }
    }
}

export { Debts };
