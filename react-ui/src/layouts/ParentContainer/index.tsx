import * as React from "react";
import { Wrapper } from "./styledComponents";

class ParentContainer extends React.Component<{}, {}> {
    render() {
        return <Wrapper>{this.props.children}</Wrapper>;
    }
}

export { ParentContainer };
