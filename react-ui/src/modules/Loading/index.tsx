import * as React from "react";

import { BrandLogo, Content, LoadingAnimation, LoadingBar } from "./styledComponents";

class Loading extends React.Component {
    render() {
        return (
            <Content>
                <BrandLogo src={require("../../assets/img/logo_color.png")} />

                <LoadingBar>
                    <LoadingAnimation />
                </LoadingBar>
            </Content>
        );
    }
}

export { Loading };
