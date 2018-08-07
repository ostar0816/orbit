import * as React from "react";
import { InvestmentEntity } from "../../../models";
import { Header, MainWrapper } from "../../../components";
import { InvestmentsMetricsContainer } from "./InvestmentsMetrics/InvestmentsMetricsContainer";
import { ActiveInvestmentContainer } from "./ActiveInvestment/ActiveInvestmentContainer";
import { InvestmentHistory } from "./InvestmentHistory";
import { BarLoader } from "react-spinners";

interface Props {
    currentTime?: number;
    investments: InvestmentEntity[];
    initializing: boolean;
}

interface State {
    allInvestments: InvestmentEntity[];
    activeInvestments: InvestmentEntity[];
    inactiveInvestments: InvestmentEntity[];
}

class Investments extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            allInvestments: [],
            activeInvestments: [],
            inactiveInvestments: [],
        };
    }

    componentDidMount() {
        this.getInvestmentsDetails(this.props.investments);
    }

    componentDidUpdate(prevProps: Props) {
        if (this.props.investments !== prevProps.investments) {
            this.getInvestmentsDetails(this.props.investments);
        }
    }

    async getInvestmentsDetails(investments: InvestmentEntity[]) {
        if (!investments) {
            return;
        }
        const allInvestments: InvestmentEntity[] = [];
        const activeInvestments: InvestmentEntity[] = [];
        const inactiveInvestments: InvestmentEntity[] = [];
        for (let investment of investments) {
            if (investment.status === "active") {
                activeInvestments.push(investment);
            } else {
                inactiveInvestments.push(investment);
            }
            allInvestments.push(investment);
        }
        this.setState({
            allInvestments,
            activeInvestments,
            inactiveInvestments,
        });
    }

    render() {
        const { allInvestments, activeInvestments, inactiveInvestments } = this.state;

        if (this.props.initializing) {
            return (
                <MainWrapper>
                    <Header title="Your Investments" />
                    <BarLoader width={200} height={15} color={"#1cc1cc"} loading={true} />
                </MainWrapper>
            );
        } else {
            return (
                <MainWrapper>
                    <Header title="Your Investments" />
                    <InvestmentsMetricsContainer investments={allInvestments} />
                    {activeInvestments.map((investment) => (
                        <ActiveInvestmentContainer
                            currentTime={this.props.currentTime}
                            investment={investment}
                            key={investment.issuanceHash}
                        />
                    ))}
                    <InvestmentHistory investments={inactiveInvestments} />
                </MainWrapper>
            );
        }
    }
}

export { Investments };
