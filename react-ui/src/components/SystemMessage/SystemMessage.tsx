import * as React from "react";

import { connect } from "react-redux";
import { Wrapper, StyledAlert } from "./styledComponents";

interface Props {
    networkId: number;
}

class SystemMessage extends React.Component<Props> {
    render() {
        const { networkId } = this.props;

        if (networkId === 1) {
            return null;
        }

        return (
            <Wrapper>
                <StyledAlert color="info" isOpen={true}>
                    Please, switch <b>MetaMask</b> to <b>mainnet</b>
                </StyledAlert>
            </Wrapper>
        );
    }
}

const mapStateToProps = (state: any) => ({
    networkId: state.web3Reducer.networkId,
});

export default connect(mapStateToProps, null)(SystemMessage);
