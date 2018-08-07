import * as React from "react";
import { PressEnterButton } from "./styledComponents";

interface Props {
    detailId: string;
}

class PressEnter extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event: any) {
        event.stopPropagation();
        const highlightNextFieldEvent = new CustomEvent("highlightNextField", {
            detail: { name: this.props.detailId },
        });
        window.dispatchEvent(highlightNextFieldEvent);
    }

    render() {
        return (
            <PressEnterButton className={"press-enter"} onClick={this.handleClick}>
                OK, Press ENTER
            </PressEnterButton>
        );
    }
}

export { PressEnter };
