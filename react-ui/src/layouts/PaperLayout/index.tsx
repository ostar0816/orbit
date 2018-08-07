import * as React from "react";
import { Background, InnerContainer } from "./styledComponents";

class PaperLayout extends React.Component {
    render() {
        return (
            <Background>
                <InnerContainer>{this.props.children}</InnerContainer>
            </Background>
        );
    }
}

export { PaperLayout };
