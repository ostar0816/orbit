import * as React from "react";
import * as ReactTooltip from "react-tooltip";
import Icon from "../Icon/Icon";

interface Props {
    content: JSX.Element;
    id: string;
}

class Tooltip extends React.Component<Props, {}> {
    render() {
        const { content, id } = this.props;
        return (
            <span data-tip={true} data-for={id}>
                <Icon icon="question-circle" />
                <ReactTooltip place="top" type="dark" effect="float" id={id}>
                    {content}
                </ReactTooltip>
            </span>
        );
    }
}

export { Tooltip };
