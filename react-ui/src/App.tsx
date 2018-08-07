import * as React from "react";
import * as Web3 from "web3";

import { PageLayout } from "./layouts";
import { Web3ModalContainer } from "./components/Web3Modal";

// const Intercom = require("react-intercom").default;
const promisify = require("tiny-promisify");

interface Props {
    web3: Web3;
    accounts: string[];
    showWeb3BrowserModal: boolean;
    detectMobileBrowser: (isMobileBrowser: boolean) => void;
}

interface State {
    intervalId: any;
}

class App extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            intervalId: undefined,
        };
    }

    isMobileDevice(): boolean {
        return (
            typeof window.orientation !== "undefined" ||
            navigator.userAgent.indexOf("IEMobile") !== -1
        );
    }

    componentDidMount() {
        this.props.detectMobileBrowser(this.isMobileDevice());

        const intervalId = setInterval(
            () => this.checkAccount(this.props.web3, this.props.accounts),
            1000,
        );
        this.setState({ intervalId });
    }

    componentWillUnmount() {
        clearInterval(this.state.intervalId);
    }

    async checkAccount(web3: Web3, accounts: string[]) {
        if (!web3 || !accounts) {
            return;
        }

        const latestAccounts = await promisify(web3.eth.getAccounts)();

        if (latestAccounts.length && accounts.length && latestAccounts[0] !== accounts[0]) {
            localStorage.clear();
            window.location.reload();
        }
    }

    render() {
        return (
            <PageLayout>
                {this.props.children}
                {/* <Intercom appID={"ll37s9fu"} /> */}
                <Web3ModalContainer showWeb3BrowserModal={this.props.showWeb3BrowserModal} />
            </PageLayout>
        );
    }
}

export { App };
