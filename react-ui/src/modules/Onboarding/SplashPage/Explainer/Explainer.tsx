import * as React from "react";

import { Wrapper, ExplainerContent } from "./StyledComponents";

export default class Explainer extends React.Component<{}, {}> {
    render() {
        return (
            <Wrapper>
                <ExplainerContent>Orbit Network 2018</ExplainerContent>
            </Wrapper>
        );
    }
}
