import * as React from "react";

import { connect } from "react-redux";

import * as Web3 from "web3";

import { DebtEntity } from "../../models";
import { Dharma } from "@dharmaprotocol/dharma.js";

import DebtOrder from "./DebtOrder";

import { Header, MainWrapper } from "../../components";

import { BarLoader } from "react-spinners";

interface Props {
    dharma: Dharma;
    web3: Web3;
    networkId: number;
    debts: DebtEntity[];
    debtsLoading: boolean;
}

class DebtsList extends React.Component<Props> {
    render() {
        const { debts, debtsLoading } = this.props;

        return (
            <MainWrapper>
                <Header title="Available loans" />
                {debtsLoading && (
                    <BarLoader width={200} height={10} color={"#1cc1cc"} loading={true} />
                )}
                {!debtsLoading &&
                    debts.length > 0 && (
                        <div>{debts.map((debt) => <DebtOrder key={debt.id} debt={debt} />)}</div>
                    )}
                {!debtsLoading && debts.length === 0 && <div>No debts found</div>}
            </MainWrapper>
        );
    }
}

const mapStateToProps = (state: any) => ({
    debts: state.debtsReducer.debts,
    debtsLoading: state.debtsReducer.loading,
    web3: state.web3Reducer.web3,
    networkId: state.web3Reducer.networkId,
    dharma: state.dharmaReducer.dharma,
});

export default connect(mapStateToProps, null)(DebtsList);
