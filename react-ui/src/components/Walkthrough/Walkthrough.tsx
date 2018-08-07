import * as React from "react";
const Joyride = require("react-joyride").default;

import { steps } from "./Steps";
import { TokenEntity } from "../../models";

export interface Props {
    finishWalkthrough: () => void;
    tokens: TokenEntity[];
    walkthroughCompleted: boolean;
    isMobileBrowser: boolean;
}

class Walkthrough extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);

        this.handleWalkthroughStateChange = this.handleWalkthroughStateChange.bind(this);
    }

    handleWalkthroughStateChange(data: any) {
        const { finishWalkthrough } = this.props;
        const { type } = data;

        if (type === "tour:end") {
            finishWalkthrough();
        }
    }

    render() {
        const { tokens, walkthroughCompleted, isMobileBrowser } = this.props;

        if (walkthroughCompleted || !tokens || tokens.length === 0 || isMobileBrowser) {
            return null;
        }

        return (
            <Joyride
                callback={this.handleWalkthroughStateChange}
                run={true}
                spotlightClicks={true}
                steps={steps}
            />
        );
    }
}

export { Walkthrough };
