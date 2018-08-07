import * as React from "react";
import { Web3BrowserIcon, Web3BrowserIcons, Web3BrowserIconWrapper } from "./styledComponents";
import { PlexModal } from "../PlexModal";

interface Props {
    showWeb3BrowserModal: boolean;
    isMobileBrowser: boolean;
}

interface State {
    showModal: boolean;
}

class Web3Modal extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            showModal: false,
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.isMobileBrowser || nextProps.showWeb3BrowserModal) {
            this.setState({ showModal: true });
        }
    }

    render() {
        const { isMobileBrowser } = this.props;

        const metamask = require("../../assets/img/web3/metamask.png");

        const desktopBrowsers = (
            <div>
                <Web3BrowserIconWrapper>
                    <a href="https://metamask.io/" target="_blank">
                        <Web3BrowserIcon src={metamask} alt="MetaMask" />
                    </a>
                </Web3BrowserIconWrapper>
            </div>
        );

        const mobilePreamble = (
            <div>
                In order to use Dharma Plex, you will need to use a desktop computer and the
                MetaMask browser extension, available for Chrome, Firefox, Opera, and the new Brave
                browser.
            </div>
        );

        const desktopPreamble = (
            <div>
                In order to use Dharma Plex on the web, you will need to install the MetaMask
                browser extension, available for Chrome, Firefox, Opera, and the new Brave browser.
            </div>
        );

        const preamble = isMobileBrowser ? mobilePreamble : desktopPreamble;

        const content = (
            <div>
                <p>
                    Dharma Plex is a Web3-enabled application, which is just a fancy way of saying
                    that it needs to be plugged into the Ethereum blockchain.
                </p>
                <p>{preamble}</p>
                {!isMobileBrowser && <Web3BrowserIcons>{desktopBrowsers}</Web3BrowserIcons>}
            </div>
        );

        const title = isMobileBrowser
            ? "You must be on desktop to use Plex"
            : "Your browser isn't Web3-enabled";
        const icon = "exclamation-triangle";

        return (
            <PlexModal showModal={this.state.showModal} title={title} icon={icon}>
                {content}
            </PlexModal>
        );
    }
}

export { Web3Modal };
