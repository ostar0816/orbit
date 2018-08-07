import * as React from "react";
import { Description, Title } from "./styledComponents";

interface HeaderProps {
    title: string;
    description?: JSX.Element;
}

class Header extends React.Component<HeaderProps, {}> {
    render() {
        return (
            <div>
                <Title>{this.props.title}</Title>
                <Description>{this.props.description}</Description>
            </div>
        );
    }
}

export { Header };
