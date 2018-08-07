import * as React from "react";

import { A } from "../../components/StyledComponents";
import { ConfirmationModal } from "../../components/ConfirmationModal";
import { WrapETHButton } from "./styledComponents";

interface Props {}

interface State {
    showModal: boolean;
}

class WrapETH extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            showModal: false,
        };
    }

    toggleModal() {
        this.setState({ showModal: !this.state.showModal });
    }

    render() {
        const wrapETHModalContent = (
            <span>
                Because ETH is not an ERC-20 token, it needs to be converted to WETH before it can
                be used on Dharma Protocol. Read more about ETH and WETH{" "}
                <A href="https://weth.io" target="_blank">
                    here
                </A>.<br />
                <br />You can convert ETH to WETH, and vice versa, using{" "}
                <A href="https://0xproject.com/portal/weth" target="_blank">
                    0x
                </A>.
            </span>
        );

        return (
            <div>
                <WrapETHButton onClick={this.toggleModal}>Why can't I use ETH?</WrapETHButton>
                <ConfirmationModal
                    content={wrapETHModalContent}
                    onSubmit={this.toggleModal}
                    modal={this.state.showModal}
                    submitButtonText={"Close"}
                    title="ETH and WETH"
                />
            </div>
        );
    }
}

export { WrapETH };
